import { IsEnum, IsString } from 'class-validator';
import { BookStatus } from 'generated/prisma/enums';

export class ChangeBookStatusDto {
  @IsEnum(BookStatus)
  @IsString({ message: 'status must be a string' })
  status: BookStatus;
}
