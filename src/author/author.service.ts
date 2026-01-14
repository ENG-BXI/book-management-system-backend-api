import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/Prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async getAllAuthors() {
    try {
      const authors = await this.prisma.author.findMany({
        include: { books: true },
      });
      return authors;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async getAuthorById(id: string) {
    try {
      const Author = await this.prisma.author.findUnique({ where: { id } });
      return Author;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async createAuthor(createAuthorDto: CreateAuthorDto) {
    try {
      const newAuthor = await this.prisma.author.create({
        data: createAuthorDto,
      });
      return newAuthor;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async editAuthor(id: string, author: UpdateAuthorDto) {
    try {
      const updatedAuthor = await this.prisma.author.update({
        where: { id },
        data: { ...author },
      });
      return updatedAuthor;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async deleteAuthor(id: string) {
    try {
      const deletedAuthor = await this.prisma.author.delete({
        where: { id },
      });
      return deletedAuthor;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
