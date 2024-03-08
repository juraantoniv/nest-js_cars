import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { DataSource, Repository } from 'typeorm';

import { ArticleEntity } from '../../database/entities/article.entity';
import { ArticleListRequestDto } from '../../modules/articles/dto/request/articles-list-request.dto';
import { IUserData } from '../../modules/auth/interfaces/user-data.interface';

@Injectable()
export class ArticleRepository extends Repository<ArticleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticleEntity, dataSource.manager);
  }

  public async getList(
    query: ArticleListRequestDto,
    userData: IUserData,
  ): Promise<[ArticleEntity[], number]> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.comments', 'comments');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect('article.likes', 'like');
    qb.setParameter('myId', userData.userId);

    if (query.search) {
      qb.andWhere(
        'CONCAT(LOWER(article.title), LOWER(article.body), LOWER(article.description)) LIKE :search',
      );
      qb.setParameter('search', `%${query.search.toLowerCase()}%`);
    }

    qb.setParameter('myId', userData.userId);
    qb.addOrderBy('article.created', 'DESC');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
