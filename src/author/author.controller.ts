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
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Get()
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
  async create(@Body(new ValidationPipe()) createAuthorDto: CreateAuthorDto) {
    const newUser = await this.authorService.createAuthor(createAuthorDto);
    return {
      data: newUser,
      message: 'Author created successfully',
      status: HttpStatus.OK,
    };
  }
  @Patch(':id')
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
