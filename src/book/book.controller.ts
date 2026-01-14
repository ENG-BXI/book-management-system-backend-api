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
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get(':id')
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
  @Get()
  async GetAllBooks() {
    const books = await this.bookService.getAllBooks();
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
  @Post()
  async AddNewBook(@Body(new ValidationPipe()) book: CreateBookDto) {
    const newBook = await this.bookService.addNewBook(book);
    return {
      data: newBook,
      message: 'Book added successfully',
      status: HttpStatus.OK,
    };
  }
  @Patch(':id')
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
  @Delete(':id')
  async DeleteBook(@Param('id', ParseUUIDPipe) id: string) {
    const deleteBook = await this.bookService.deleteBook(id);
    return {
      data: deleteBook,
      message: 'Book deleted successfully',
      status: HttpStatus.OK,
    };
  }
}
