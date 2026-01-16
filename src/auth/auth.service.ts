import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/Login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/SignUp.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new HttpException(
        'Email or Password is incorrect',
        HttpStatus.NOT_FOUND,
      );
    }
    const PASSWORD_SECRET = process.env.PASSWORD_SECRET;
    if (!PASSWORD_SECRET)
      throw new Error('PASSWORD_SECRET is not defined in .env file');
    const isPasswordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new Error('Invalid password');
    }
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: PASSWORD_SECRET,
      expiresIn: '1h',
    });
    const returnUser = {
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
    return returnUser;
  }
  async signUp(signUpDto: SignUpDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: signUpDto.email },
    });
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const PASSWORD_SECRET = process.env.PASSWORD_SECRET;
    if (!PASSWORD_SECRET)
      throw new Error('PASSWORD_SECRET is not defined in .env file');
    // Hash Password
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    // Create New User
    const newUser = await this.prisma.user.create({
      data: {
        name: signUpDto.name,
        email: signUpDto.email,
        password: hashedPassword,
        role: 'User',
      },
    });
    const payload = {
      sub: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
    // Create Token
    const token = await this.jwtService.signAsync(payload, {
      secret: PASSWORD_SECRET,
      expiresIn: '1h',
    });
    const returnUser = {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token,
    };
    return returnUser;
  }
}
