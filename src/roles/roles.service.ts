import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';
import { isUUID } from 'class-validator';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    try {
      const findRole = await this.findRoleByTerm(createRoleDto.name)

      if (findRole) throw new BadRequestException(`El rol [${createRoleDto.name}] ya esiste`);

      const roles = this.roleRepository.create(createRoleDto);
      await this.roleRepository.insert(roles);

      return roles;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async findAll() {
    return await this.roleRepository.find({
      where: {
        status: 'A'
      }
    });
  }

  async findOne(roleName: string) {
    try {
      const role = await this.findRoleByTerm(roleName)

      if (!role) throw new NotFoundException('El rol de usuario no existe')

      return role
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async update(term: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(term);

    const propFilter = isUUID(term) ? 'id' : 'name';

    this.roleRepository.update({ [propFilter]: term }, updateRoleDto);

    return 'Rol actualizado correctamente';
  }

  async remove(term: string) {
    const role = await this.findOne(term);

    role.status = 'I';

    this.roleRepository.update({ id: role.id }, role);

    return 'Rol eliminado correctamente';
  }



  async findRoleByTerm(roleName: string) {
    try {
      const role = await this.roleRepository.findOne({
        where: {
          name: roleName,
          status: 'A'
        }
      });

      return role;
    } catch (error) {
      throw error
    }
  }
}
