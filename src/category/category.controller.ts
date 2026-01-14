import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    const categories = await this.categoryService.getAllCategories();
    return {
      data: categories,
      message: 'Categories fetched successfully',
      status: HttpStatus.OK,
    };
  }

  @Post()
  async createCategory(
    @Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto,
  ) {
    const newCategory =
      await this.categoryService.createCategory(createCategoryDto);
    return {
      data: newCategory,
      message: 'Category created successfully',
      status: HttpStatus.OK,
    };
  }

  @Patch(':id')
  async updateCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateCategoryDto: UpdateCategoryDto,
  ) {
    const updatedCategory = await this.categoryService.updateCategory(
      id,
      updateCategoryDto,
    );
    if (!updateCategoryDto)
      return {
        data: null,
        message: 'Category not found',
        status: HttpStatus.BAD_REQUEST,
      };
    return {
      data: updatedCategory,
      message: 'Category updated successfully',
      status: HttpStatus.OK,
    };
  }

  @Delete(':id')
  async deleteCategory(@Param('id', ParseUUIDPipe) id: string) {
    const deletedCategory = await this.categoryService.deleteCategory(id);
    if (!deletedCategory)
      return {
        data: null,
        message: 'Category not found',
        status: HttpStatus.BAD_REQUEST,
      };
    return {
      data: deletedCategory,
      message: 'Category deleted successfully',
      status: HttpStatus.OK,
    };
  }
}
