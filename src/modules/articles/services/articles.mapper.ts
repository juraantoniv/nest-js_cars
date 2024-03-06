import { UserMapper } from 'src/modules/user/services/user.mapper';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { ArticleListRequestDto } from '../dto/request/articles-list-request.dto';
import {
  ArticleListResponseDto,
  ArticleResponseDto,
} from '../dto/response/article-response.dto';

export class ArticleMapper {
  public static toResponseDto(
    articleEntity: ArticleEntity,
  ): ArticleResponseDto {
    return {
      id: articleEntity.id,
      body: articleEntity.body,
      title: articleEntity.title,
      description: articleEntity.description,
      created: articleEntity.created,
      updated: articleEntity.updated,
      comments: articleEntity.comments ? articleEntity.comments : null,
      isLiked: !!articleEntity.likes?.[0],
      likes: articleEntity.likes,
      user: articleEntity.user
        ? UserMapper.toResponseDto(articleEntity.user)
        : null,
    };
  }

  public static toListResponseDto(
    entities: ArticleEntity[],
    total: number,
    query: ArticleListRequestDto,
  ): ArticleListResponseDto {
    return {
      data: entities.map(this.toResponseDto),
      meta: {
        limit: query.limit,
        offset: query.offset,
        total,
      },
    };
  }
}
