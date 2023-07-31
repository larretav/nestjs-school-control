import { Injectable, Logger } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ){}

  create(createRoleDto: CreateRoleDto) {
    return 'Aqui es para crear';
  }

  findAll() {
    return this.roleRepository.find();
  }

  async findOne(roleName: string) {
    try {
      return await this.roleRepository.findOneBy({name: roleName})
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
