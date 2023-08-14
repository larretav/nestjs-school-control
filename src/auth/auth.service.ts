import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginInDto } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { compare, hash } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(userKey: string, password: string){

    const findUser = await this.usersService.validateUser(userKey);

    const checkPassword = await compare(password, findUser.password)
    
    if (findUser && checkPassword) return findUser;

    return null;
  }

  async login(user: LoginInDto) {
    
    const { password, username } = user;

    const findUser = await this.usersService.findOne(username);

    const checkPassword = await compare(password, findUser.password)
    
    if (!checkPassword) throw new ForbiddenException('Contraseña incorrecta');

    const payload = {
      user: username,
      name: `${findUser.firstName} ${findUser.lastName}`.trim(),
      role: findUser.role
    }

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  logout() {
    return 'Prueba de logout'
  }

  async getUserRole(username: string) {
    const findUser = await this.usersService.findOne(username);
    return findUser.role;
  }

  getUserFromToken(jwtToken: string) {
    return this.jwtService.decode(jwtToken)
  }
}
