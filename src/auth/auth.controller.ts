import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInDto } from './dto/sign-in.dto';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Body() loginData: LoginInDto) {
    return this.authService.login(loginData);
  }

  // @Post('register')
  // register(@Body() user: CreateUserDto) {
  //   this.authService.register(user)
  // }

  @Get('role/:username')
  userRole(@Param('username') username: string) {
    return this.authService.getUserRole(username);
  }
}