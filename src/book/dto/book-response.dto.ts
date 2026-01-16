import { ApiProperty } from '@nestjs/swagger';
import { BookEntity } from '../entities/book.entity';

export class BookDetailsResponseDto {
  @ApiProperty({ type: BookEntity })
  data: BookEntity;

  @ApiProperty({ example: 'Book found successfully' })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;
}

export class BookListResponseDto {
  @ApiProperty({ type: [BookEntity] })
  data: BookEntity[];

  @ApiProperty({ example: 'Books found successfully' })
  message: string;

  @ApiProperty({ example: 200 })
  status: number;
}
