import { Controller, Post,UseGuards, Get, Param, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { LoginInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  login(@Body() loginData: LoginInDto) {
    return this.authService.login(loginData);
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // login(@Request() req) {
  //   console.log(req);
  //   return this.authService.login({username: req.body.username, password: req.body.password});
  // }

  // @Post('register')
  // register(@Body() user: CreateUserDto) {
  //   this.authService.register(user)
  // }

  // @UseGuards(JwtAuthGuard)
  @Get('role/:username')
  userRole(@Param('username') username: string) {
    return this.authService.getUserRole(username);
  }


}