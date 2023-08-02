import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
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
      const findUser = await this.usersRepository.findOneBy({ username: createUserDto.username });

      if (findUser)
        throw new BadRequestException('El nombre de usuario ya existe')

      const role = await this.rolesService.findOne(createUserDto.role);

      const hashPassword = await hash(createUserDto.password, 10);
      createUserDto.password = hashPassword;

      const user = this.usersRepository.create({ ...createUserDto, role })
      await this.usersRepository.save(user)

      return 'Usuario registrado';

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

    const modifiedUsers = users.map((user) => ({ ...user, role: user.role.name }))

    return modifiedUsers;
  }

  async findOne(term: string) {

    const propFilter = isUUID(term) ? 'id' : 'username';

    const user = await this.usersRepository.findOne({
      where: { [propFilter]: term },
      relations: { role: true }
    })

    if (!user)
      throw new NotFoundException('Usuario no encontrado')

    return {
      ...user,
      role: user.role.name
    }
  }

  async validateUser(username: string) {
    return this.findOne(username)
  }

}
