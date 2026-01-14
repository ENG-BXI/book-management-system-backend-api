import { IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString({ message: 'name must be a string' })
  name: string;
  @IsString({ message: 'description must be a string' })
  @IsOptional()
  description?: string;
}
