import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { log } from 'console';

import { EFileTypes, S3Service } from '../../../common/services/s3.service';
import { UserEntity } from '../../../database/entities/user.entity';
import { FollowRepository } from '../../../repository/services/follow.repository';
import { RefreshTokenRepository } from '../../../repository/services/refresh-token.repository';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { UpdateUserDto } from '../dto/request/update-user.dto';
import { UsersListRequestDto } from '../dto/request/users-list.request.dto';
import { UserResponseDto } from '../dto/response/user-response.dto';
import { UserRepository } from '../user.repository';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly followRepository: FollowRepository,
    private readonly s3Serv: S3Service,
  ) {}

  public async create(createUserDto: CreateUserDto, file: Express.Multer.File) {
    this.logger.log('Creating user with DTO:', createUserDto);

    const findUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (findUser) {
      throw new BadRequestException('User already exist');
    }

    const newUser = this.userRepository.create(createUserDto);

    newUser.password = await bcrypt.hash(newUser.password, 5);

    const user = await this.userRepository.save(newUser);
    const filePath = await this.s3Serv.uploadFile(
      file,
      EFileTypes.User,
      user.id,
    );
    newUser.avatar = filePath;
    await this.userRepository.save(user);
    return newUser;
  }

  public async findAll(query: UsersListRequestDto, userData: IUserData) {
    try {
      return await this.userRepository.getList(query, userData);
    } catch (e) {
      log(e);
    }
  }

  public async findOne(id: string) {
    return await this.findUserByIdOrException(id);
  }

  public async findUserByQuery(
    query: UsersListRequestDto,
    userData: IUserData,
  ) {
    const [users, total] = await this.userRepository.getUser(query, userData);

    return users;
  }
  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
    userData: IUserData,
  ): Promise<UserResponseDto> {
    if (id !== userData.userId) {
      throw new ForbiddenException();
    }
    const entity = await this.findUserByIdOrException(id);
    this.userRepository.merge(entity, updateUserDto);
    return UserMapper.toResponseDto(await this.userRepository.save(entity));
  }

  public async remove(id: string, userData: IUserData) {
    if (id !== userData.userId) {
      throw new ForbiddenException();
    }
    const entity = await this.userRepository.findOneBy({ id });
    if (!entity) {
      throw new UnprocessableEntityException('User not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: userData.userId },
      relations: ['refreshTokens'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userData.userId} not found`);
    }
    log(user.refreshTokens);

    // Delete the user and related refresh tokens
    await this.userRepository.remove(user);
  }
  private async findUserByIdOrException(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnprocessableEntityException('User entity not found');
    }
    return user;
  }

  public async follow(userId: string, userData: IUserData) {
    const user = await this.findUserByIdOrException(userData.userId);
    if (userData.userId === userId) {
      throw new ConflictException('You cant follow yourself');
    }
    const follow = await this.followRepository.findOneBy({
      follower_id: userData.userId,
      following_id: userId,
    });
    if (follow) {
      throw new ConflictException('You already follow this user');
    }
    await this.followRepository.save(
      this.followRepository.create({
        follower_id: user.id,
        following_id: userId,
      }),
    );
  }
  public async unfollow(userId: string, userData: IUserData) {
    const user = await this.findUserByIdOrException(userData.userId);
    const follow = await this.followRepository.findOneBy({
      follower_id: user.id,
      following_id: userId,
    });
    if (!follow) {
      throw new ConflictException("You can't unfollow this user");
    }
    await this.followRepository.remove(follow);
  }
}
