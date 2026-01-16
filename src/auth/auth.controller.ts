import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';
import { SignUpDto } from './dto/SignUp.dto';
import { RolesGuard } from 'src/Common/Guards/roles.guard';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiOperation({ summary: 'Authenticate user and return a JWT token' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async login(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    loginDto: LoginDto,
  ) {
    const user = await this.authService.login(loginDto);
    return {
      data: user,
      message: 'Login successful',
      status: HttpStatus.OK,
    };
  }
  @Post('signup')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiResponse({ status: 201, description: 'Signup successful' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Email already exists or invalid data',
  })
  async signup(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    signupDto: SignUpDto,
  ) {
    const user = await this.authService.signUp(signupDto);
    return {
      data: user,
      message: 'Signup successful',
      status: HttpStatus.OK,
    };
  }
}
