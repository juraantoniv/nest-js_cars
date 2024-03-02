import { PickType } from '@nestjs/swagger';

import { ArticleBaseRequestDto } from './article-base.request.dto';

export class CreateArticleRequestDto extends PickType(ArticleBaseRequestDto, [
  'title',
  'body',
  'description',
]) {}
