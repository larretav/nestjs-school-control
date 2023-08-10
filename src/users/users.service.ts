import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { RolesService } from 'src/roles/roles.service';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {

  private readonly logger = new Logger();

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private rolesService: RolesService
  ) { }

  async create(createUserDto: CreateUserDto) {

    try {
      const findUser = await this.findUserByTerm(createUserDto.userKey);

      if (findUser)
        throw new BadRequestException('El nombre de usuario ya existe')

      const role = await this.rolesService.findOne(createUserDto.role);

      const hashPassword = await hash(createUserDto.password, 10);
      createUserDto.password = hashPassword;

      const user = this.usersRepository.create({ ...createUserDto, role })
      await this.usersRepository.save(user)

      return user;

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async find() {
    const users = await this.usersRepository.find({
      relations: {
        role: true,
      }
    });

    if(users.length == 0) throw new NotFoundException('No se encontraron usuarios')

    const modifiedUsers = users.map((user) => ({ ...user, role: user.role.name }))

    return modifiedUsers;
  }

  async findOne(term: string) {

    try {
      const user = await this.findUserByTerm(term);

      if (!user)
        throw new NotFoundException('Usuario no encontrado')
  
      return {
        ...user,
        role: user.role.name
      }
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }

  }

  async validateUser(userKey: string) {
    return this.findOne(userKey)
  }

  async findUserByTerm(term: string) {
    const propFilter = isUUID(term) ? 'id' : 'userKey';

    try {
      const user = await this.usersRepository.findOne({
        where: {
          [propFilter]: term,
          status: 'A'
        }
      });

      return user;
    } catch (error) {
      throw error
    }
  }

}
