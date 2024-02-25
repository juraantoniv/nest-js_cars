import { Module } from '@nestjs/common';

import { ExampleService } from '../../common/services/email.service';
import { S3Service } from '../../common/services/s3.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ExampleService, UserRepository, S3Service],
})
export class UserModule {}
