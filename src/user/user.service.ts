import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
