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

      let student = this.studentRepository.create({user, professionalCareer});
      await this.studentRepository.save(student);

      return 'Estudiante registrado';

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async findAll() {
    const students = await this.studentRepository.find({
      relations: {
        user: true,
        professionalCareer: true,
        schoolGroup: true,
        schoolSubjects: true,
        attendances: true
      },
      select: {
        id: true,
        semester: true,
        // user: {
        //   updatedAt: false,
        //   createdAt: false,

        //   role: {
        //     name: true
        //   }
        // },
        professionalCareer: { name: true },
        schoolGroup: {
          groupNumber: true,
          schoolYear: true
        },
        schoolSubjects: {
          name: true,
          semester: true,
          subjectKey: true
        },
        attendances: true,
      }
    })

    const studentResp = students.map(student => {
      const { user, professionalCareer, schoolGroup, ...rest } = student;
      return {
        ...rest,
        ...user,
        role: user.role.name,
        professionalCareer: professionalCareer.name,
        schoolGroup: schoolGroup ? {  } : null
      
      }

    })

    return students;
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

      if (!student) throw new NotFoundException('No se encontró el alumno')

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
