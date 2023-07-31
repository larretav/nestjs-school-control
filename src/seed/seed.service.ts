import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessionalCareer } from 'src/professional_careers/entities/professional_career.entity';
import { initDataProfessionalCareers } from './data/professional_career.data';
import { Role } from 'src/roles/entities/role.entity';
import { initRolesData } from './data/roles.data';
import { SchoolGroup } from 'src/school_groups/entities/school_group.entity';
import { SchoolSubject } from 'src/school_subjects/entities/school_subject.entity';
import { initSchoolGroupsData } from './data/school_groups.data';
import { initSchoolSubjectsData } from './data/school_subjects.data';

@Injectable()
export class SeedService {
  
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(ProfessionalCareer)
    private readonly professionalCareerRepository: Repository<ProfessionalCareer>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(SchoolGroup)
    private readonly schoolGroupRepository: Repository<SchoolGroup>,

    @InjectRepository(SchoolSubject)
    private readonly schoolSubjectRepository: Repository<SchoolSubject>
  )
  { }
  
  async runAllSeed() {

    await this.runProfessionalCareerSeed();
    await this.runRolesSeed();
    await this.runSchoolGroupSeed();
    await this.runSchoolSubjectSeed();

    return 'Data inserted'
  }

  async runProfessionalCareerSeed() {
    try {
      const profCareers = this.professionalCareerRepository.create(initDataProfessionalCareers)
      await this.professionalCareerRepository.insert(profCareers)

      return profCareers;
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async runRolesSeed() {
    try {
      const roles = this.roleRepository.create(initRolesData)
      await this.roleRepository.insert(roles)

      return roles;
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async runSchoolGroupSeed() {
    try {
      const schoolGroups = this.schoolGroupRepository.create(initSchoolGroupsData)
      await this.schoolGroupRepository.insert(schoolGroups)

      return schoolGroups;
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async runSchoolSubjectSeed() {
    try {
      const schoolSubjects = this.schoolSubjectRepository.create(initSchoolSubjectsData)
      await this.schoolSubjectRepository.insert(schoolSubjects)

      return schoolSubjects;
    } catch (error) {
      this.handleExceptions(error)
    }
  }


  handleExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);


    this.logger.error(error);
    throw new InternalServerErrorException('Ayuda we :\'v')
  }
}
