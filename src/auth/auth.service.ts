import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginInDto } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { hash } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(email, password);
    console.log(`[AuthService] validateUser: email=${email}, password=${password}`)

    return null
  }

  async login(user: LoginInDto) {
    console.log(`[AuthService] login: user=${JSON.stringify(user)}`)
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
      email: user.username
    };
  }

  async register(user: CreateUserDto) {
    const { password } = user;
    const hashPassword = await hash(password, 10);
    user.password = hashPassword;

    return;
  } 
}
