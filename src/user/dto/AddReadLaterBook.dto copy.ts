import { IsString } from 'class-validator';

export class AddReadLaterBookDto {
  @IsString({ message: 'bookId is Must be String' })
  bookId: string;
}
