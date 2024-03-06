import { CommentEntity } from '../../../../database/entities/comment.entity';
import { UserResponseDto } from '../../../user/dto/response/user-response.dto';

export class ArticleResponseDto {
  id: string;
  title: string;
  description: string;
  body: string;
  created: Date;
  updated: Date;
  comments: CommentEntity[];
  isLiked: boolean;
  likes: any;
  user?: UserResponseDto;
}

export class ArticleListResponseDto {
  data: ArticleResponseDto[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}
