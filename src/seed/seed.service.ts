import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessionalCareer } from 'src/professional_careers/entities/professional_career.entity';
import { initDataProfessionalCareers } from './data/professional_career.data';

@Injectable()
export class SeedService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(ProfessionalCareer)
    private readonly professionalCareerRepository: Repository<ProfessionalCareer>
  )
  { }
  
  async runSeed() {

    // this.userRepository.in
    return 'ok';
  }

  async runProfessionalCareerSeed() {
    console.log('hola')
    const profCareers = this.professionalCareerRepository.create(initDataProfessionalCareers)
    await this.professionalCareerRepository.insert(profCareers)
    return profCareers
  }

  async runRolesSeed() {
    
  }

  async runSchoolGroupSeed() {
    
  }

  async runSchoolSubjectSeed() {
    
  }



}
