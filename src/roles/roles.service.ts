import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    try {
      const roles = this.roleRepository.create(createRoleDto)
      await this.roleRepository.insert(roles)
    } catch (error) {

    }
  }

  findAll() {
    return this.roleRepository.find();
  }

  async findOne(roleName: string) {
    try {
      const role = await this.roleRepository.findOneBy({ name: roleName });
      
      if (!role) throw new NotFoundException('El rol de usuario no existe')

      return role
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
