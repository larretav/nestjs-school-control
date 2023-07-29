import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInDto } from './dto/sign-in.dto';
import { LocalAuthGuard } from './guards/local-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Body() loginData: LoginInDto) {
    return this.authService.login(loginData);
  }

  @Get('role:username')
  userRole(@Param('username') username: string) {
    return this.authService.getUserRole(username);
  }
}