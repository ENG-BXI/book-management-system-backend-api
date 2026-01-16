import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany({
        include: {
          favoriteBook: {
            select: {
              id: true,
              name: true,
              coverImage: true,
            },
          },
          readLater: {
            select: {
              id: true,
              name: true,
              coverImage: true,
            },
          },
        },
      });
      return users;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async addFavoriteBook(userId: string, bookId) {
    try {
      const favoriteBooks = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: { favoriteBook: { select: { id: true } } },
      });
      const checkIsExist = favoriteBooks?.favoriteBook.some((item) => {
        return item.id == bookId;
      });

      if (checkIsExist)
        throw new HttpException(
          'User Has This Book Favorite',
          HttpStatus.BAD_REQUEST,
        );
      const favoriteBook = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          favoriteBook: {
            connect: { id: bookId },
          },
        },
      });
      return favoriteBook;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async removeFavoriteBook(userId: string,bookId:string){
    try {
      const favoriteBooks = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: { favoriteBook: { select: { id: true } } },
      });
      const checkIsExist = favoriteBooks?.favoriteBook.some((item) => {
        return item.id == bookId;
      });
      if (!checkIsExist)
        throw new HttpException(
          'User Don\'t Have This Book in Favorite',
          HttpStatus.BAD_REQUEST,
        );
      const favoriteBook = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          favoriteBook: {
            disconnect: { id: bookId },
          },
        },
      });
      return favoriteBook;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async addReadLaterBook(userId: string, bookId) {
    try {
      const ReadLaterBooks = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: { readLater: { select: { id: true } } },
      });
      const checkIsExist = ReadLaterBooks?.readLater.some((item) => {
        return item.id == bookId;
      });

      if (checkIsExist)
        throw new HttpException(
          'User Has This Book Read Later ',
          HttpStatus.BAD_REQUEST,
        );
      const ReadLaterBook = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          readLater: {
            connect: { id: bookId },
          },
        },
      });
      return ReadLaterBook;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async removeReadLaterBook(userId: string,bookId:string){
    try {
      const ReadLaterBooks = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: { readLater: { select: { id: true } } },
      });
      const checkIsExist = ReadLaterBooks?.readLater.some((item) => {
        return item.id == bookId;
      });
      if (!checkIsExist)
        throw new HttpException(
          'User Don\'t Have This Book in Read Later',
          HttpStatus.BAD_REQUEST,
        );
      const ReadLaterBook = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          readLater: {
            disconnect: { id: bookId },
          },
        },
      });
      return ReadLaterBook;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
