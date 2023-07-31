import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { RolesService } from 'src/roles/roles.service';

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
      const role = await this.rolesService.findOne(createUserDto.role);
      const user = this.usersRepository.create({...createUserDto, role})
      const newUser = await this.usersRepository.save(user)

      return newUser;

    } catch (error) {
      this.handleExceptions(error)
    }
  }


  async findOne(term: string) {

    let user: User;

    if (isUUID(term)) {
      user = await this.usersRepository.findOneBy({id: term})
    } else {
      user = await this.usersRepository.findOneBy({ username: term });
    }
    

    if (!user)
      throw new NotFoundException('Usuario no encontrado')

    return user
  }

  async validateUser(username: string) {
    return this.findOne(username)
  }


  handleExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);


    this.logger.error(error);
    // console.log(error);
    throw new InternalServerErrorException('Error interno del servidor')
  }

}
