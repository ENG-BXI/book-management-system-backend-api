import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from 'src/Prisma/prisma.service';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}
  async getBookDetails(id: string) {
    try {
      const book = await this.prisma.book.findUnique({ where: { id } });
      return book;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async getAllBooks() {
    try {
      return await this.prisma.book.findMany();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async addNewBook(book: CreateBookDto) {
    try {
      return await this.prisma.book.create({ data: book });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async editBook(bookId: string, book: UpdateBookDto) {
    try {
      return await this.prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          ...book,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async deleteBook(bookId: string) {
    try {
      return await this.prisma.book.delete({
        where: {
          id: bookId,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
