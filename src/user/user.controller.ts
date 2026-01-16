import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AddFavoriteBookDto } from './dto/AddFavoriteBookDto.dto';
import { AddReadLaterBookDto } from './dto/AddReadLaterBook.dto copy';
import { RolesGuard } from 'src/Common/Guards/roles.guard';
import { Roles } from 'src/Common/Decorators/roles.decorator';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(['Admin'])
  async GetAllUsers() {
    const users = await this.userService.getAllUsers();
    if (users.length == 0)
      return { users, message: 'No users found', status: HttpStatus.NOT_FOUND };
    return { users, message: 'Get Users successful', status: HttpStatus.OK };
  }
  @Patch(':id/add-favorite-book')
  @Roles(['User'])
  async addFavoriteBook(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) addFavoriteBook: AddFavoriteBookDto,
  ) {
    const favoriteBook = await this.userService.addFavoriteBook(
      id,
      addFavoriteBook.bookId,
    );
    return {
      data: favoriteBook,
      message: 'Add Favorite Book Successfully',
      status: HttpStatus.OK,
    };
  }
  @Patch(':id/remove-favorite-book')
  @Roles(['User'])
  async removeFavoriteBook(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) removeFavoriteBook: AddFavoriteBookDto,
  ) {
    const favoriteBook = await this.userService.removeFavoriteBook(
      id,
      removeFavoriteBook.bookId,
    );
    return {
      data: favoriteBook,
      message: 'Remove Favorite Book Successfully',
      status: HttpStatus.OK,
    };
  }
  @Patch(':id/add-read-later-book')
  @Roles(['User'])
  async addReadLaterBook(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) addReadLaterBook: AddReadLaterBookDto,
  ) {
    const ReadLaterBook = await this.userService.addReadLaterBook(
      id,
      addReadLaterBook.bookId,
    );
    return {
      data: ReadLaterBook,
      message: 'Add Read Later Book Successfully',
      status: HttpStatus.OK,
    };
  }
  @Patch(':id/remove-read-later-book')
  @Roles(['User'])
  async removeReadLaterBook(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) removeReadLaterBook: AddReadLaterBookDto,
  ) {
    const ReadLaterBook = await this.userService.removeReadLaterBook(
      id,
      removeReadLaterBook.bookId,
    );
    return {
      data: ReadLaterBook,
      message: 'Remove Read Later Book Successfully',
      status: HttpStatus.OK,
    };
  }
}
