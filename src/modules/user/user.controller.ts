import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { log } from 'console';

import { EEmailAction } from '../../common/enums/email.action.enum';
import { ExampleService } from '../../common/services/email.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UsersListRequestDto } from './dto/request/users-list.request.dto';
import { UserResponseDto } from './dto/response/user-response.dto';
import { UserService } from './services/user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly exampleService: ExampleService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    log('file', file);
    log('file', createUserDto);
    await this.exampleService.example(createUserDto, EEmailAction.REGISTER, {
      name: createUserDto.name,
    });
    return await this.userService.create(createUserDto, file);
  }

  @ApiBearerAuth()
  @Get()
  public async findAll(
    @CurrentUser() userData: IUserData,
    @Query() query: UsersListRequestDto,
  ) {
    return await this.userService.findAll(query, userData);
  }
  @ApiBearerAuth()
  @Get('/me')
  public async me(@CurrentUser() userData: IUserData) {
    return await this.userService.findOne(userData.userId);
  }

  @ApiBearerAuth()
  @Get('followingUsers')
  public async findOne(
    @CurrentUser() userData: IUserData,
    @Query() query: UsersListRequestDto,
  ) {
    return await this.userService.findUserByQuery(query, userData);
  }

  @Patch('/update')
  public async update(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() userData: IUserData,
  ): Promise<UserResponseDto> {
    return await this.userService.update(
      userData.userId,
      updateUserDto,
      userData,
    );
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async remove(
    @Param('id') id: string,
    @CurrentUser() userData: IUserData,
  ) {
    return await this.userService.remove(id, userData);
  }

  @ApiBearerAuth()
  @Post(':userId/follow')
  public async follow(
    @Param('userId', ParseUUIDPipe) userId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.userService.follow(userId, userData);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @Delete(':userId/follow')
  public async unfollow(
    @Param('userId', ParseUUIDPipe) userId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.userService.unfollow(userId, userData);
  }
}
