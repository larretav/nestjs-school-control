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

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(email);

    console.log(`[AuthService] validateUser: email=${email}, password=${password}`)

    return null
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
    
  }

  // async register(user: CreateUserDto) {
  //   const hashPassword = await hash(user.password, 10);
  //   user.password = hashPassword;
    
  //   const userResp = await this.usersService.create(user)

  //   return userResp;
  // } 

  async getUserRole(username: string) {
    const findUser = await this.usersService.findOne(username);
    return findUser.role;
  }
}
