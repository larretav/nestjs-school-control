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

      const profCareer = await this.professionalCareerService.findOne(createStudentDto.professionalCareer);

      const { professionalCareer, ...user } = createStudentDto;

      const student = this.studentRepository.create({ professionalCareer: profCareer });
      await this.studentRepository.save(student);

      await this.usersService.create(user);

      return 'Estudiante registrado';

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async findAll() {
    const students = await this.studentRepository.find({
      relations: {
        user: {
          role: true
        }
      },
      where: {
        user: {
          role: {
            name: ROLES.STUDENT
          }
        }
      }
    })

    const studentResp = students.map(student => ({
      ...student,
      ...student.user,
      role: student.user.role
    }))

    return studentResp;
  }

  async findOne(term: string) {
    const propFilter = isUUID(term) ? 'id' : 'userKey';

    try {

      const student = await this.studentRepository.findOne({
        relations: {
          user: {
            role: true
          }
        },
        where: {
          user: {
            [propFilter]: term,
            role: {
              name: ROLES.STUDENT
            }
          }
        }
      })

      if(!student) throw new NotFoundException('No se encontró el alumno')

      return student
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
