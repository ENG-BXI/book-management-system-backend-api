import {
  IsDate,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'name must be string' })
  @MinLength(3, { message: 'name must be at least 3 characters long' })
  @MaxLength(30, { message: 'name must be at most 30 characters long' })
  name: string;

  @IsString({ message: 'description must be string' })
  @MinLength(3, { message: 'description must be at least 3 characters long' })
  @MaxLength(255, {
    message: 'description must be at most 255 characters long',
  })
  description: string;

  @IsString({ message: 'coverImage must be string' })
  @MinLength(3, { message: 'coverImage must be at least 3 characters long' })
  coverImage: string;

  @IsUUID('all', { message: 'categoryId must be a valid UUID' })
  categoryId: string;

  @IsUUID('all', { message: 'authorId must be a valid UUID' })
  authorId: string;

  @IsString({ message: 'createdAt must be a valid string' })
  createdAt: Date;
}
