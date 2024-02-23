import { Logger, Module } from '@nestjs/common';

import { ExampleService } from '../../common/services/email.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ExampleService],
})
export class UserModule {}
