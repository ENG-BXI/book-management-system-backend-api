import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  ParseUUIDPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Roles } from 'src/Common/Decorators/roles.decorator';
import { RolesGuard } from 'src/Common/Guards/roles.guard';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Authors')
@ApiBearerAuth('JWT-auth')
@Controller('author')
@UseGuards(RolesGuard)
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Get()
  @Roles([])
  @ApiOperation({ summary: 'Retrieve a list of all authors' })
  @ApiResponse({
    status: 200,
    description: 'List of authors retrieved successfully',
  })
  async getAllAuthor() {
    const authors = await this.authorService.getAllAuthors();
    if (!authors) {
      throw new HttpException('Authors not found', HttpStatus.NOT_FOUND);
    }
    return {
      data: authors,
      message: 'Get All Authors successfully',
      status: HttpStatus.OK,
    };
  }
  @Get(':id')
  @Roles([])
  @ApiOperation({ summary: 'Get details of a specific author' })
  @ApiParam({ name: 'id', description: 'The UUID of the author' })
  @ApiResponse({ status: 200, description: 'Author details found' })
  @ApiResponse({ status: 404, description: 'Author not found' })
  async getAuthorById(@Param('id', ParseUUIDPipe) id: string) {
    const author = await this.authorService.getAuthorById(id);
    if (!author) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }
    return {
      data: author,
      message: 'Get Author by ID successfully',
      status: HttpStatus.OK,
    };
  }
  @Post()
  @Roles(['Admin'])
  @ApiOperation({ summary: 'Create a new author record (Admin only)' })
  @ApiResponse({ status: 201, description: 'Author created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires Admin role' })
  async create(@Body(new ValidationPipe()) createAuthorDto: CreateAuthorDto) {
    const newUser = await this.authorService.createAuthor(createAuthorDto);
    return {
      data: newUser,
      message: 'Author created successfully',
      status: HttpStatus.OK,
    };
  }
  @Patch(':id')
  @Roles(['Admin'])
  @ApiOperation({ summary: 'Update an existing author record (Admin only)' })
  @ApiParam({ name: 'id', description: 'The UUID of the author to update' })
  @ApiResponse({ status: 200, description: 'Author updated successfully' })
  @ApiResponse({ status: 404, description: 'Author not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateAuthorDto: UpdateAuthorDto,
  ) {
    const updatedAuthor = await this.authorService.editAuthor(
      id,
      updateAuthorDto,
    );
    if (!updatedAuthor) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }
    return {
      data: updatedAuthor,
      message: 'Update Author successfully',
      status: HttpStatus.OK,
    };
  }
  @Delete(':id')
  @Roles(['Admin'])
  @ApiOperation({ summary: 'Delete an author record (Admin only)' })
  @ApiParam({ name: 'id', description: 'The UUID of the author to delete' })
  @ApiResponse({ status: 200, description: 'Author deleted successfully' })
  @ApiResponse({ status: 404, description: 'Author not found' })
  async deleteAuthor(@Param('id', ParseUUIDPipe) id: string) {
    const deletedAuthor = await this.authorService.deleteAuthor(id);
    if (!deletedAuthor) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }
    return {
      data: deletedAuthor,
      message: 'Delete Author successfully',
      status: HttpStatus.OK,
    };
  }
}
