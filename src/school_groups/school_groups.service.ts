import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchoolGroupDto } from './dto/create-school_group.dto';
import { UpdateSchoolGroupDto } from './dto/update-school_group.dto';
import { SchoolGroup } from './entities/school_group.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';

@Injectable()
export class SchoolGroupsService {

  constructor(
    @InjectRepository(SchoolGroup)
    private readonly schoolGroupRepository: Repository<SchoolGroup>
  ) { }



  async create(createSchoolGroupDto: CreateSchoolGroupDto) {
    try {
      const findSchoolGroup = await this.schoolGroupRepository.findOneBy({
        groupNumber: createSchoolGroupDto.groupNumber,
        schoolYear: createSchoolGroupDto.schoolYear
      });

      if (findSchoolGroup) throw new BadRequestException(`El grupo [${createSchoolGroupDto.schoolYear}0${createSchoolGroupDto.groupNumber}] ya existe`);

      const schoolGroup = this.schoolGroupRepository.create(createSchoolGroupDto)
      await this.schoolGroupRepository.insert(schoolGroup)

      return schoolGroup;
    } catch (error) {
      const exception = new HandleExceptions()
      exception.handleExceptions(error)
    }
  }

  async findAll() {
    return await this.schoolGroupRepository.find({
      where: {
        status: 'A'
      }
    });
  }

  async findOne(id: string) {
    try {
      const schoolGroup = await this.schoolGroupRepository.findOneBy({id});

      if (!schoolGroup) throw new NotFoundException('Grupo no encontrado');

      return schoolGroup;
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async update(id: string, updateSchoolGroupDto: UpdateSchoolGroupDto) {
    try {
      
      const schoolGroup = await this.findOne(id);
  
      this.schoolGroupRepository.update({ id: schoolGroup.id }, updateSchoolGroupDto);
  
      return 'Grupo actualizado correctamente';

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      
      const schoolGroup = await this.findOne(id);
      schoolGroup.status = 'I';
  
      this.schoolGroupRepository.update({ id: schoolGroup.id }, schoolGroup);
  
      return 'Grupo eliminado correctamente';

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }
}
