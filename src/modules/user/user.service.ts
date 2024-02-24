import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';

import { GlobalExceptionFilter } from '../../common/exeptions/global-exception.filter';
import { ExampleService } from '../../common/services/email.service';
import { UserEntity } from '../../database/entities/user.entity';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserRepository } from './user.repository';

const users = [];

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  public async create(createUserDto: CreateUserDto) {
    this.logger.log('Creating user with DTO:', createUserDto);
    const newUser = this.userRepository.create(createUserDto);

    await this.userRepository.save(newUser);
    return newUser;
  }

  public async findAll() {
    return await this.userRepository.find();
  }

  public async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    const entity = await this.findUserByIdOrException(id);
    this.userRepository.merge(entity, updateUserDto);
    return await this.userRepository.save(entity);
  }

  public async remove(id: string) {
    const etity = await this.userRepository.findOneBy({ id });
    if (!etity) {
      throw new UnprocessableEntityException('User not found');
    }

    await this.userRepository.remove(etity);
  }
  private async findUserByIdOrException(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnprocessableEntityException('User entity not found');
    }
    return user;
  }
}
