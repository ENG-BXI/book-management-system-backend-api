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
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from 'src/Common/Decorators/roles.decorator';
import { RolesGuard } from 'src/Common/Guards/roles.guard';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Categories')
@ApiBearerAuth('JWT-auth')
@Controller('category')
@UseGuards(RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Roles([])
  @ApiOperation({ summary: 'Retrieve all book categories' })
  @ApiResponse({ status: 200, description: 'Categories fetched successfully' })
  async getAllCategories() {
    const categories = await this.categoryService.getAllCategories();
    return {
      data: categories,
      message: 'Categories fetched successfully',
      status: HttpStatus.OK,
    };
  }

  @Post()
  @Roles(['Admin'])
  @ApiOperation({ summary: 'Create a new book category (Admin only)' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires Admin role' })
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
  @Roles(['Admin'])
  @ApiOperation({ summary: 'Update an existing category (Admin only)' })
  @ApiParam({ name: 'id', description: 'The UUID of the category to update' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
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
  @Roles(['Admin'])
  @ApiOperation({ summary: 'Delete a category (Admin only)' })
  @ApiParam({ name: 'id', description: 'The UUID of the category to delete' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
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
