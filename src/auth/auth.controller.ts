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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
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
