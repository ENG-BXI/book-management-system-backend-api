import { ApiProperty } from '@nestjs/swagger';
import { BookStatus } from 'generated/prisma/enums';

export class BookEntity {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'The Great Gatsby' })
  name: string;

  @ApiProperty({ example: 'A classic novel about the American Dream' })
  description: string;

  @ApiProperty({ example: 'https://example.com/cover.jpg' })
  coverImage: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  categoryId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  authorId: string;

  @ApiProperty({ example: '2023-10-27T10:00:00Z' })
  createdAt: Date;

  @ApiProperty({ enum: BookStatus, example: BookStatus.available })
  status: BookStatus;
}
