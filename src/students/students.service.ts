import { BadRequestException, Injectable } from '@nestjs/common';
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
      
      // const propFilterProfCareer = isUUID(createStudentDto.professionalCareer) ? 'id' : 'name';
      // const professionalCareer = await this.professionalCareerRepository.findOneBy({ [propFilterProfCareer]: createStudentDto.professionalCareer });

      const profCareer = await this.professionalCareerService.findOne(createStudentDto.professionalCareer);
      
      const {professionalCareer, ...user} = createStudentDto;

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
        user: true
      }
    })

    const studentResp = students.map(student => ({
      ...student,
      ...student.user,
      role: student.user.role
    }))
    
    return studentResp;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
