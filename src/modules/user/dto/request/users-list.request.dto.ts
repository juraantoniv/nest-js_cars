import { PickType } from '@nestjs/swagger';

import { ArticleListRequestDto } from '../../../articles/dto/request/articles-list-request.dto';

export class UsersListRequestDto extends PickType(ArticleListRequestDto, [
  'limit',
  'offset',
]) {}
