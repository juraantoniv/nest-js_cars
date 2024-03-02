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
import { UpdateArticleRequestDto } from './dto/request/update-acrticle.dto';
import { ArticlesService } from './services/articles.service';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiBearerAuth()
  @Get()
  public async getAll(@Query() query: ArticleListRequestDto): Promise<any> {
    return await this.articlesService.getList(query);
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
}
