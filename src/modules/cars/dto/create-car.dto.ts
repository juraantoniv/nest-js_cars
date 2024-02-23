import { Transform } from 'class-transformer';
import { IsInt, IsString, Length } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @Length(2, 20)
  @Transform(({ value }) => value.trim())
  brand: string;

  @IsInt()
  price: number;

  @IsString()
  description: string;
}
