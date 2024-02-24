import { Module } from '@nestjs/common';

import { ExampleService } from '../../common/services/email.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ExampleService, UserRepository],
})
export class UserModule {}
