import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception-filters';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './dto/user-role.enum';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('api/users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.usersService.createUser(createUserDto);
    return newUser;
  }

  @Get('getAllUsers')
  findAllUsers(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('role') role?: UserRole,
  ): Promise<User[]> {
    return this.usersService.findAllUsers(name, email, role);
  }
}
