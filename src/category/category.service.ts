import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/Prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllCategories() {
    try {
      const categories = await this.prisma.category.findMany();
      return categories;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({
        data: createCategoryDto,
      });
      return category;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });
      return category;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async deleteCategory(id: string) {
    try {
      const category = await this.prisma.category.delete({
        where: { id },
      });
      return category;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
