import { Injectable } from '@nestjs/common';
import { CreateProfessionalCareerDto } from './dto/create-professional_career.dto';
import { UpdateProfessionalCareerDto } from './dto/update-professional_career.dto';

@Injectable()
export class ProfessionalCareersService {
  create(createProfessionalCareerDto: CreateProfessionalCareerDto) {
    return 'This action adds a new professionalCareer';
  }

  findAll() {
    return `This action returns all professionalCareers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} professionalCareer`;
  }

  update(id: number, updateProfessionalCareerDto: UpdateProfessionalCareerDto) {
    return `This action updates a #${id} professionalCareer`;
  }

  remove(id: number) {
    return `This action removes a #${id} professionalCareer`;
  }
}
