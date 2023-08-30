import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessionalCareer } from 'src/professional_careers/entities/professional_career.entity';
import { isUUID } from 'class-validator';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';
import { User } from 'src/users/entities/user.entity';
import { ProfessionalCareersService } from 'src/professional_careers/professional_careers.service';
import { UsersService } from 'src/users/users.service';
import { ROLES } from 'src/constants/roles';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    private readonly professionalCareerService: ProfessionalCareersService,
    private readonly usersService: UsersService,
  ) { }


  async create(createStudentDto: CreateStudentDto) {
    try {

      const findUser = await this.usersService.findUserByTerm(createStudentDto.userKey);
      if (findUser) throw new BadRequestException('Estudiante ya registrado')

      const professionalCareer = await this.professionalCareerService.findOne(createStudentDto.professionalCareer);

      const { professionalCareer: _, ...userData } = createStudentDto;

      const user = await this.usersService.create(userData);

      let student = this.studentRepository.create({ user, professionalCareer });
      await this.studentRepository.save(student);

      return 'Estudiante registrado';

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async findAll() {

    return this.studentQuery().getRawMany();

  }

  async findOne(term: string) {
    const propFilter = isUUID(term) ? 'id' : 'userKey';

    try {

      const student = await this.studentQuery().getRawOne();

      if (!student) throw new NotFoundException('No se encontró el alumno')

      return student
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    try {

      const findStudent = this.findOne(id);
      
      const student = this.studentRepository.findOneBy({ id });
      
      const {role, professionalCareer,  } = updateStudentDto;

      // const user = await this.usersService.create(userData);

      // await this.studentRepository.save(student);

      return 'Estudiante registrado';

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }

  studentQuery() {
    return this.studentRepository.createQueryBuilder('student')
      .leftJoinAndSelect('student.user', 'user')
      .leftJoinAndSelect('student.schoolGroup', 'schoolGroup')
      .leftJoinAndSelect('student.professionalCareer', 'professionalCareer')
      .leftJoinAndSelect('user.role', 'role')
      .select([
        'student.id AS id',
        'student.semester AS semester',
        'user.userKey AS userKey',
        'user.firstName as firstName',
        'user.lastName AS lastName',
        'user.email AS email',
        'role.name AS role',
        'role.name AS role',
        'role.name AS role',
        'professionalCareer.name AS professionalCareer',
        'schoolGroup.groupNumber AS groupNumber',
        'schoolGroup.schoolYear AS schoolYear',
      ])
  }
}


