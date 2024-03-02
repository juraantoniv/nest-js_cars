import { Module } from '@nestjs/common';

import { ExampleService } from '../../common/services/email.service';
import { S3Service } from '../../common/services/s3.service';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ExampleService, UserRepository, S3Service],
})
export class UserModule {}
