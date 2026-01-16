import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddReadLaterBookDto {
  @IsString({ message: 'bookId is Must be String' })
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The UUID of the book',
  })
  bookId: string;
}
