import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'The title of the book',
    example: 'The Great Gatsby',
  })
  name: string;

  @IsString({ message: 'description must be string' })
  @MinLength(3, { message: 'description must be at least 3 characters long' })
  @MaxLength(255, {
    message: 'description must be at most 255 characters long',
  })
  @ApiProperty({
    description: 'A short summary of the book content',
    example: 'A story about the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.',
  })
  description: string;

  @IsString({ message: 'coverImage must be string' })
  @MinLength(3, { message: 'coverImage must be at least 3 characters long' })
  @ApiProperty({
    description: 'URL or path to the cover image of the book',
    example: 'https://example.com/covers/gatsby.jpg',
  })
  coverImage: string;

  @IsUUID('all', { message: 'categoryId must be a valid UUID' })
  @ApiProperty({
    description: 'The unique identifier of the category this book belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  categoryId: string;

  @IsUUID('all', { message: 'authorId must be a valid UUID' })
  @ApiProperty({
    description: 'The unique identifier of the author of the book',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  authorId: string;

  @IsString({ message: 'createdAt must be a valid string' })
  @ApiProperty({
    description: 'The creation date of the book record',
    example: '2023-10-27T10:00:00Z',
  })
  createdAt: Date;
}
