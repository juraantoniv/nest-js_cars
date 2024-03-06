import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { ArticleListRequestDto } from './dto/request/articles-list-request.dto';
import { CreateArticleRequestDto } from './dto/request/create-acrticle.dto';
import { CreateCommentRequestDto } from './dto/request/create-comment.request.dto';
import { UpdateArticleRequestDto } from './dto/request/update-acrticle.dto';
import { ArticlesService } from './services/articles.service';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiBearerAuth()
  @Get()
  public async getAll(
    @Query() query: ArticleListRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<any> {
    return await this.articlesService.getList(query, userData);
  }
  @ApiBearerAuth()
  @Post()
  public async create(
    @Body() dto: CreateArticleRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<any> {
    return await this.articlesService.create(dto, userData);
  }
  @ApiBearerAuth()
  @Patch(':articleId')
  public async edit(
    @Param('articleId', ParseUUIDPipe) articleId: string,
    @Body() dto: UpdateArticleRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<any> {
    return await this.articlesService.editArticle(articleId, dto, userData);
  }
  @ApiBearerAuth()
  @Get(':articleId')
  public async getById(
    @Param('articleId', ParseUUIDPipe) articleId: string,
  ): Promise<any> {
    return await this.articlesService.getArticleById(articleId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @Delete(':articleId')
  public async deleteArticleById(
    @Param('articleId', ParseUUIDPipe) articleId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.articlesService.deleteArticleById(articleId, userData);
  }

  @ApiBearerAuth()
  @Post(':articleId/comment')
  public async commentArticle(
    @Param('articleId', ParseUUIDPipe) articleId: string,
    @CurrentUser() userData: IUserData,
    @Body() body: CreateCommentRequestDto,
  ): Promise<void> {
    await this.articlesService.commentArticle(articleId, userData, body);
  }

  @Post(':articleId/like')
  public async like(
    @Param('articleId', ParseUUIDPipe) articleId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.articlesService.like(articleId, userData);
  }

  @Delete(':articleId/like')
  public async dislike(
    @Param('articleId', ParseUUIDPipe) articleId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.articlesService.dislike(articleId, userData);
  }
}
