import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { ArticleRepository } from '../../../repository/services/article.repository';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CreateArticleRequestDto } from '../dto/request/create-acrticle.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  public async getList(query: any): Promise<any> {
    const qb = this.articleRepository.createQueryBuilder('article');
    qb.addOrderBy('article.created', 'DESC');
    qb.take(10);
    qb.skip(0);
    const [entities, total] = await qb.getManyAndCount();
    return { entities, total };
    // return ArticleMapper.toResponseDto(article);
  }
  public async create(
    dto: CreateArticleRequestDto,
    userData: IUserData,
  ): Promise<any> {
    return await this.articleRepository.save(
      this.articleRepository.create({ ...dto, user_id: userData.userId }),
    );
  }

  public async editArticle(
    articleId: string,
    dto: CreateArticleRequestDto,
    userData: IUserData,
  ): Promise<any> {
    const entity = await this.findMyOneByIdOrThrow(articleId, userData.userId);
    this.articleRepository.merge(entity, dto);
    return await this.articleRepository.save(entity);
  }

  public async getArticleById(articleId: string): Promise<any> {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
      relations: { user: true },
    });
    return article;
  }

  public async deleteArticleById(articleId: string, userData: IUserData) {
    const article = await this.findMyOneByIdOrThrow(articleId, userData.userId);
    await this.articleRepository.remove(article);
  }

  private async findMyOneByIdOrThrow(
    articleId: string,
    userId: string,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOneBy({
      id: articleId,
    });
    if (!article) {
      throw new UnprocessableEntityException();
    }
    if (article.user_id !== userId) {
      throw new ForbiddenException();
    }
    return article;
  }
}
