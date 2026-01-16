import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'name must be a string' })
  @ApiProperty({
    example: 'Science Fiction',
    description: 'The name of the category',
  })
  name: string;
}
