import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { PrismaService } from 'src/Prisma/prisma.service';

@Module({
  controllers: [AuthorController],
  providers: [PrismaService,AuthorService],
})
export class AuthorModule {}
