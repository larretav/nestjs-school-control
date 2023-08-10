import { Injectable } from '@nestjs/common';
import { CreateSchoolSubjectDto } from './dto/create-school_subject.dto';
import { UpdateSchoolSubjectDto } from './dto/update-school_subject.dto';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolSubject } from './entities/school_subject.entity';

@Injectable()
export class SchoolSubjectsService {

  constructor(
    @InjectRepository(SchoolSubject)
    private readonly schoolSubjectRepository: Repository<SchoolSubject>
  ){}

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

  findAll() {
    return `This action returns all schoolSubjects`;
  }

  findOne(term: string) {
    return `This action returns a #${term} schoolSubject`;
  }

  update(id: number, updateSchoolSubjectDto: UpdateSchoolSubjectDto) {
    return `This action updates a #${id} schoolSubject`;
  }

  remove(id: number) {
    return `This action removes a #${id} schoolSubject`;
  }
}
