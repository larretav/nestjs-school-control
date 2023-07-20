import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService {

  private readonly logger = new Logger();

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }


  async findOne(username: string, password: string) {

    const user = await this.usersRepository.findOneBy({ username, password });

    if (!user)
      throw new NotFoundException('Usuario no encontrado')

    return user
  }

  async validateUser(username: string, password: string) {
    return this.findOne(username, password)
  }


  handleExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);


    this.logger.error(error);
    // console.log(error);
    throw new InternalServerErrorException('Error interno del servidor')
  }

}
