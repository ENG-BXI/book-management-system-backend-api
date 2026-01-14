import { Controller, Get, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async GetAllUsers() {
    const users = await this.userService.getAllUsers();
    if (users.length == 0)
      return { users, message: 'No users found', status: HttpStatus.NOT_FOUND };
    return { users, message: 'Get Users successful', status: HttpStatus.OK };
  }
}
