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
import { RolesGuard } from 'src/Common/Guards/roles.guard';
import { Roles } from 'src/Common/Decorators/roles.decorator';

@Controller('book')
@UseGuards(RolesGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get('latest-book')
  @Roles([])
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
  async GetAllBooks(
    @Query('search') search: string,
    @Query('filter') filter: string,
  ) {
    console.log(search, filter);
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
  @Roles(['Admin'])
  async DeleteBook(@Param('id', ParseUUIDPipe) id: string) {
    const deleteBook = await this.bookService.deleteBook(id);
    return {
      data: deleteBook,
      message: 'Book deleted successfully',
      status: HttpStatus.OK,
    };
  }
  @Patch('change-book-status/:id')
  @Roles(['Admin'])
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
}
