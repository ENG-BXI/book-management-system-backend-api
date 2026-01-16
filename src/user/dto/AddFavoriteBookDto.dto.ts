import { IsString } from 'class-validator';

export class AddFavoriteBookDto {
  @IsString({ message: 'bookId is Must be String' })
  bookId: string;
}
