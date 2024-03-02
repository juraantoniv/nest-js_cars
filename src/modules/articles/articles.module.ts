import { Module } from '@nestjs/common';

import { ArticleRepository } from '../../repository/services/article.repository';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './services/articles.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticleRepository],
  exports: [ArticlesService],
})
export class ArticlesModule {}
