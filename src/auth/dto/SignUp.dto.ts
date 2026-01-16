import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString({ message: 'Name is required' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
  })
  name: string;

  @IsString({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address for the new account',
  })
  email: string;

  @IsString({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @ApiProperty({
    example: 'password123',
    description: 'The password for the new account',
  })
  password: string;
}
