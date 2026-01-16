import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString({ message: 'name must be a string' })
  @ApiProperty({
    example: 'F. Scott Fitzgerald',
    description: 'The full name of the author',
  })
  name: string;

  @IsString({ message: 'description must be a string' })
  @IsOptional()
  @ApiProperty({
    example: 'An American novelist and screenwriter',
    description: 'A short biography of the author',
    required: false,
  })
  description?: string;
}
