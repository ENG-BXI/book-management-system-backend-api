import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from 'src/Prisma/prisma.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookStatus } from 'generated/prisma/enums';

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
  async getAllBooks(search?: string, filter?: string) {
    try {
      const where: any = {};

      // 1. If search is provided, add OR conditions for various fields
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { author: { name: { contains: search, mode: 'insensitive' } } },
          { description: { contains: search, mode: 'insensitive' } },
          { category: { name: { contains: search, mode: 'insensitive' } } },
        ];
      }

      // 2. If filter is provided and valid, add it to the where clause
      if (filter === 'available' || filter === 'unAvailable') {
        where.status = filter;
      }

      return await this.prisma.book.findMany({
        where,
        include: {
          author: true,
          category: true,
        },
      });
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
  async changeStatus(id: string, status: BookStatus) {
    try {
      const bookStatus = await this.prisma.book.update({
        where: {
          id,
        },
        data: {
          status: status,
        },
      });
      return bookStatus;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async getLatestBook() {
    try {
      const latestBook = await this.prisma.book.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take: 10,
        select: {
          id: true,
          name: true,
          description: true,
          coverImage: true,
          status: true,
          author: {
            select: {
              name: true,
            },
          },
          category: {
            select: {
              name: true,
            },
          },
        },
      });
      return latestBook;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
