import { Injectable, NotFoundException } from '@nestjs/common';
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
      const profCareers = this.professionalCareerRepository.create(createProfessionalCareerDto)
      await this.professionalCareerRepository.insert(profCareers)

      return profCareers;
    } catch (error) {
      const exception = new HandleExceptions()
      exception.handleExceptions(error)
    }
  }

  findAll() {
    return this.professionalCareerRepository.find();
  }

  async findOne(term: string) {
    const propFilter = isUUID(term) ? 'id' : 'name';

    const profCareer = await this.professionalCareerRepository.findOneBy({ [propFilter]: term })

    if (!profCareer)
      throw new NotFoundException('Carrera profesional no encontrada');

    return profCareer;
  }

  async update(term: string, updateProfessionalCareerDto: UpdateProfessionalCareerDto) {
    const profCareer = await this.findOne(term);

    this.professionalCareerRepository.update({ id: profCareer.id }, updateProfessionalCareerDto);

    return 'Carrera actualizada correctamente';
  }

  async remove(id: string) {
    const profCareer = await this.findOne(id);

    this.professionalCareerRepository.delete({id: profCareer.id})
    return `La carrera "${profCareer.name}" se ha eliminado`;
  }
}
