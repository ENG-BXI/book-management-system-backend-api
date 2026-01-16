import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString({ message: 'Name is required' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;
  @IsString({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;
  @IsString({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
