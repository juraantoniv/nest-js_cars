import { Injectable, Logger } from '@nestjs/common';

import { ExampleService } from '../../common/services/email.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';

const users = [];

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  public async create(createUserDto: CreateUserDto) {
    this.logger.log('Creating user with DTO:', createUserDto);
    return createUserDto;
  }

  public async findAll() {
    return users;
  }

  public async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
