import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.usersService.findOne(term);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto ) {
    return this.usersService.create(createUserDto)
  }
}
