import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
  ValidationPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ChangeBookStatusDto } from './dto/changeBookStatus.dto';
import { BookEntity } from './entities/book.entity';
import {
  BookDetailsResponseDto,
  BookListResponseDto,
} from './dto/book-response.dto';
import { RolesGuard } from 'src/Common/Guards/roles.guard';
import { Roles } from 'src/Common/Decorators/roles.decorator';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Books')
@ApiBearerAuth('JWT-auth')
@Controller('book')
@UseGuards(RolesGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get('latest-book')
  @Roles([])
  @ApiOperation({ summary: 'Retrieve the latest books added to the system' })
  @ApiResponse({
    status: 200,
    description: 'Latest books found successfully',
    type: BookListResponseDto,
  })
  async GetLatestBook() {
    const latestBook = await this.bookService.getLatestBook();
    return {
      data: latestBook,
      message: 'Latest books found successfully',
      status: HttpStatus.OK,
    };
  }
  @Get()
  @Roles([])
  @ApiOperation({ summary: 'Get all books with optional search and filter' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search query for book titles',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'Filter category or status',
  })
  @ApiResponse({
    status: 200,
    description: 'Books found successfully',
    type: BookListResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No books matching the criteria were found',
  })
  async GetAllBooks(
    @Query('search') search: string,
    @Query('filter') filter: string,
  ) {
    const books = await this.bookService.getAllBooks(search, filter);
    if (!books) {
      return {
        data: [],
        message: 'Books not found',
        status: HttpStatus.NOT_FOUND,
      };
    }
    return {
      data: books,
      message: 'Books found successfully',
      status: HttpStatus.OK,
    };
  }
  @Get(':id')
  @Roles([])
  @ApiOperation({ summary: 'Get detailed information about a specific book' })
  @ApiParam({ name: 'id', description: 'The UUID of the book' })
  @ApiResponse({
    status: 200,
    description: 'Book details found successfully',
    type: BookDetailsResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Book with the given ID not found' })
  async GetBookDetails(@Param('id', ParseUUIDPipe) id: string) {
    const book = await this.bookService.getBookDetails(id);
    if (!book) {
      return {
        data: null,
        message: 'Book not found',
        status: HttpStatus.NOT_FOUND,
      };
    }
    return {
      data: book,
      message: 'Book found successfully',
      status: HttpStatus.OK,
    };
  }
  @Post()
  @Roles(['Admin'])
  @ApiOperation({ summary: 'Add a new book to the library (Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Book has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires Admin role' })
  async AddNewBook(@Body(new ValidationPipe()) book: CreateBookDto) {
    const newBook = await this.bookService.addNewBook(book);
    return {
      data: newBook,
      message: 'Book added successfully',
      status: HttpStatus.OK,
    };
  }
  @Patch(':id')
  @Roles(['Admin'])
  @ApiOperation({ summary: 'Update an existing book record (Admin only)' })
  @ApiParam({ name: 'id', description: 'The UUID of the book to update' })
  @ApiResponse({ status: 200, description: 'Book updated successfully' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async EditBook(
    @Param('id', ParseUUIDPipe) bookId: string,
    @Body(new ValidationPipe()) book: UpdateBookDto,
  ) {
    const updatedBook = await this.bookService.editBook(bookId, book);
    return {
      data: updatedBook,
      message: 'Book updated successfully',
      status: HttpStatus.OK,
    };
  }
  @Patch('change-book-status/:id')
  @Roles(['Admin'])
  @ApiOperation({
    summary: 'Change the availability status of a book (Admin only)',
  })
  @ApiParam({ name: 'id', description: 'The UUID of the book' })
  @ApiResponse({ status: 200, description: 'Book status updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid status value' })
  async changeBookStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) book: ChangeBookStatusDto,
  ) {
    const updatedBook = await this.bookService.changeStatus(id, book.status);
    return {
      data: updatedBook,
      message: 'Book status updated successfully',
      status: HttpStatus.OK,
    };
  }
  @Delete(':id')
  @Roles(['Admin'])
  @ApiOperation({ summary: 'Remove a book from the system (Admin only)' })
  @ApiParam({ name: 'id', description: 'The UUID of the book to delete' })
  @ApiResponse({ status: 200, description: 'Book deleted successfully' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async DeleteBook(@Param('id', ParseUUIDPipe) id: string) {
    const deleteBook = await this.bookService.deleteBook(id);
    return {
      data: deleteBook,
      message: 'Book deleted successfully',
      status: HttpStatus.OK,
    };
  }
}
