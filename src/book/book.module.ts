import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from 'src/Prisma/prisma.service';

@Module({
  controllers: [BookController],
  providers: [PrismaService, BookService],
})
export class BookModule {}
