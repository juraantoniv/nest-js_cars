import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { log } from 'console';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { CommentEntity } from '../../../database/entities/comment.entity';
import { ArticleRepository } from '../../../repository/services/article.repository';
import { CommentRepository } from '../../../repository/services/comment.repository';
import { LikeRepository } from '../../../repository/services/like.repository';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ArticleListRequestDto } from '../dto/request/articles-list-request.dto';
import { CreateArticleRequestDto } from '../dto/request/create-acrticle.dto';
import { CreateCommentRequestDto } from '../dto/request/create-comment.request.dto';
import { ArticleListResponseDto } from '../dto/response/article-response.dto';
import { ArticleMapper } from './articles.mapper';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly commentRepository: CommentRepository,
    private readonly likeRepository: LikeRepository,
  ) {}

  public async getList(
    query: ArticleListRequestDto,
    userData: IUserData,
  ): Promise<ArticleListResponseDto> {
    const [entities, total] = await this.articleRepository.getList(
      query,
      userData,
    );

    log(entities);

    return ArticleMapper.toListResponseDto(entities, total, query);
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
  public async like(articleId: string, userData: IUserData) {
    const article = await this.articleRepository.findOneBy({ id: articleId });
    if (article.user_id === userData.userId) {
      throw new ForbiddenException('You cant like your article');
    }
    const like = await this.likeRepository.findOneBy({
      user_id: userData.userId,
      article_id: article.id,
    });
    if (like) {
      throw new ForbiddenException('You already like this article');
    }
    await this.likeRepository.save(
      this.likeRepository.create({
        user_id: userData.userId,
        article_id: article.id,
      }),
    );
  }

  public async dislike(articleId: string, userData: IUserData) {
    const article = await this.articleRepository.findOneBy({ id: articleId });

    const like = await this.likeRepository.findOneBy({
      user_id: userData.userId,
      article_id: article.id,
    });
    if (!like) {
      throw new ForbiddenException('You already cant dislike article');
    }
    await this.likeRepository.remove(like);
  }

  public async commentArticle(
    articleId: string,
    userData: IUserData,
    body: CreateCommentRequestDto,
  ) {
    const commentEntity = this.commentRepository.create({
      user_id: userData.userId,
      article_id: articleId,
      body: body.body,
    });
    return await this.commentRepository.save(commentEntity);
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
