import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginInDto } from './dto/sign-in.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  // async signIn(username: string, password: string) {
  // const user = await this.userService.findOne(username, password);

  // if (user?.password !== password) {
  //   throw new UnauthorizedException('Usuario no autorizado');
  // }

  // const payload = { sub: user.id, username: user.username };
  //   const payload = { sub: 'dasdasdas', username };

  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };

  // }

  // async login(user: User): Promise<string> {
  //   const payload = { username: user.username, sub: user.id };
  //   return this.jwtService.signAsync(payload);
  // }



  async validateUser(email: string, password: string): Promise<any> {
    console.log(`[AuthService] validateUser: email=${email}, password=${password}`)
    return await this.usersService.validateUser(email, password);
  }

  async login(user: LoginInDto) {
    console.log(`[AuthService] login: user=${JSON.stringify(user)}`)
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
      email: user.username
    };
  }
}
