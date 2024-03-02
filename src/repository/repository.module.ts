import { Global, Module } from '@nestjs/common';

import { CarsModule } from '../modules/cars/cars.module';
import { UserModule } from '../modules/user/user.module';
import { UserRepository } from '../modules/user/user.repository';
import { ArticleRepository } from './services/article.repository';
import { CommentRepository } from './services/comment.repository';
import { FollowRepository } from './services/follow.repository';
import { LikeRepository } from './services/like.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { TagRepository } from './services/tag.repository';

const repositories = [
  ArticleRepository,
  TagRepository,
  RefreshTokenRepository,
  LikeRepository,
  CommentRepository,
  FollowRepository,
  UserRepository,
];

@Global()
@Module({
  imports: [UserModule, CarsModule],
  controllers: [],
  providers: [...repositories],
  exports: [...repositories, UserModule, CarsModule],
})
export class RepositoryModule {}
