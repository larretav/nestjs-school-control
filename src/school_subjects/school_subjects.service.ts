import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchoolSubjectDto } from './dto/create-school_subject.dto';
import { UpdateSchoolSubjectDto } from './dto/update-school_subject.dto';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolSubject } from './entities/school_subject.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class SchoolSubjectsService {

  constructor(
    @InjectRepository(SchoolSubject)
    private readonly schoolSubjectRepository: Repository<SchoolSubject>
  ) { }

  async create(createSchoolSubjectDto: CreateSchoolSubjectDto) {
    try {
      const schoolGroup = this.schoolSubjectRepository.create(createSchoolSubjectDto)
      await this.schoolSubjectRepository.insert(schoolGroup)

      return schoolGroup;
    } catch (error) {
      const exception = new HandleExceptions()
      exception.handleExceptions(error)
    }

  }

  async findAll() {
    try {
      return await this.schoolSubjectRepository.find({
        where: {
          status: 'A'
        }
      });
    } catch (error) {
      const exception = new HandleExceptions()
      exception.handleExceptions(error)
    }
  }

  async findOne(term: string) {
    try {
      const propFilter = isUUID(term) ? 'id' : 'name';
      const role = await this.schoolSubjectRepository.findOne({
        where: {
          [propFilter]: term,
          status: 'A'
        }
      });

      if (!role) throw new NotFoundException('El rol de usuario no existe');

      return role
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async update(id: string, updateSchoolSubjectDto: UpdateSchoolSubjectDto) {
    try {
      await this.findOne(id);
      this.schoolSubjectRepository.update({ id }, updateSchoolSubjectDto);

      return 'Asignatura actualizada correctamente';

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const schoolSubject = await this.findOne(id);

      schoolSubject.status = 'I';

      this.schoolSubjectRepository.update({ id }, schoolSubject)

      return `La asignatura "${schoolSubject.name}" se ha eliminado`;

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }
}
