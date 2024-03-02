import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class ArticleBaseRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  @Transform(({ value }) => value.trim())
  @Type(() => String)
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}
