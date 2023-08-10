import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfessionalCareerDto } from './dto/create-professional_career.dto';
import { UpdateProfessionalCareerDto } from './dto/update-professional_career.dto';
import { isUUID } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessionalCareer } from './entities/professional_career.entity';
import { Repository } from 'typeorm';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';

@Injectable()
export class ProfessionalCareersService {

  constructor(
    @InjectRepository(ProfessionalCareer)
    private readonly professionalCareerRepository: Repository<ProfessionalCareer>
  ) { }

  async create(createProfessionalCareerDto: CreateProfessionalCareerDto) {
    try {
      const findProfCareer = await this.findProfCareerByTerm(createProfessionalCareerDto.name);

      if (findProfCareer) throw new BadRequestException(`La carrera [${createProfessionalCareerDto.name}] ya existe`);
      
      const profCareers = this.professionalCareerRepository.create(createProfessionalCareerDto)
      await this.professionalCareerRepository.insert(profCareers)

      return profCareers;
    } catch (error) {
      const exception = new HandleExceptions()
      exception.handleExceptions(error)
    }
  }

  async findAll() {
    return await this.professionalCareerRepository.find({
      where: {
        status: 'A'
      }
    });
  }

  async findOne(term: string) {

    try {
      const profCareer = await this.findProfCareerByTerm(term);

      if (!profCareer) throw new NotFoundException('Carrera profesional no encontrada');

      return profCareer
    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async update(term: string, updateProfessionalCareerDto: UpdateProfessionalCareerDto) {
    try {
      
      const profCareer = await this.findOne(term);
  
      this.professionalCareerRepository.update({ id: profCareer.id }, updateProfessionalCareerDto);
  
      return 'Carrera actualizada correctamente';

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const profCareer = await this.findOne(id);

      profCareer.status = 'I';
  
      this.professionalCareerRepository.update({ id: profCareer.id }, profCareer)
      
      return `La carrera "${profCareer.name}" se ha eliminado`;

    } catch (error) {
      const exception = new HandleExceptions();
      exception.handleExceptions(error);
    }
  }


  async findProfCareerByTerm(term: string) {
    const propFilter = isUUID(term) ? 'id' : 'name';
    try {
      const profCareer = await this.professionalCareerRepository.findOne({
        where: {
          [propFilter]: term,
          status: 'A'
        }
      });

      return profCareer;
    } catch (error) {
      throw error
    }
  }
}
