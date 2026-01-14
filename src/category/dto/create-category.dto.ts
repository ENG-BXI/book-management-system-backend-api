import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'name must be a string' })
  name: string;
}
