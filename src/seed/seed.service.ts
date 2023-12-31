import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { SchoolGroup } from 'src/school_groups/entities/school_group.entity';
import { ProfessionalCareer } from 'src/professional_careers/entities/professional_career.entity';
import { SchoolSubject } from 'src/school_subjects/entities/school_subject.entity';
import { HandleExceptions } from 'src/common/exceptions/handleExceptions';

import {
  initUsersData,
  initDataProfessionalCareers,
  initRolesData,
  initSchoolGroupsData,
  initSchoolSubjectsIngSoftwareData,
  initSchoolSubjectsIngCivilData,
  initSchoolSubjectsIngGeodesicaData
} from './data';

@Injectable()
export class SeedService {

  private readonly logger = new Logger();
  private readonly exception = new HandleExceptions();

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
    private readonly schoolSubjectRepository: Repository<SchoolSubject>,

  ) { }

  async runAllSeed() {

    await this.runRolesSeed();
    await this.runProfessionalCareerSeed();
    await this.runSchoolGroupSeed();
    await this.runSchoolSubjectSeed();
    await this.runUsersSeed();

    return 'Data inserted'
  }

  async runProfessionalCareerSeed() {
    try {
      const profCareers = this.professionalCareerRepository.create(initDataProfessionalCareers)
      await this.professionalCareerRepository.insert(profCareers)

      return profCareers;
    } catch (error) {
      this.exception.handleExceptions(error);
    }
  }

  async runRolesSeed() {
    try {
      const roles = this.roleRepository.create(initRolesData)
      await this.roleRepository.insert(roles)

      return roles;
    } catch (error) {
      this.exception.handleExceptions(error);
    }
  }

  async runSchoolGroupSeed() {
    try {
      const schoolGroups = this.schoolGroupRepository.create(initSchoolGroupsData);
      await this.schoolGroupRepository.insert(schoolGroups);

      return schoolGroups;
    } catch (error) {
      this.exception.handleExceptions(error);
    }
  }

  async runSchoolSubjectSeed() {
    try {
      const findCareerIngSoft = await this.professionalCareerRepository.findOneBy({ programNumber: 20522 });
      const findCareerIngCiv = await this.professionalCareerRepository.findOneBy({ programNumber: 13101 });
      const findCareerIngGeo = await this.professionalCareerRepository.findOneBy({ programNumber: 83503 });

      let schoolSubjectsIngSoftwareData = initSchoolSubjectsIngSoftwareData.map(item => ({ ...item, professionalCareer: findCareerIngSoft }))
      let schoolSubjectsIngCivilData = initSchoolSubjectsIngCivilData.map(item => ({ ...item, professionalCareer: findCareerIngCiv }))
      let schoolSubjectsIngGeodesicaData = initSchoolSubjectsIngGeodesicaData.map(item => ({ ...item, professionalCareer: findCareerIngGeo }))

      const schoolSubjects = this.schoolSubjectRepository.create([
        ...schoolSubjectsIngSoftwareData,
        ...schoolSubjectsIngCivilData,
        ...schoolSubjectsIngGeodesicaData
      ]);

      await this.schoolSubjectRepository.insert(schoolSubjects)

      return schoolSubjects;
    } catch (error) {
      this.exception.handleExceptions(error);
    }
  }


  async runUsersSeed() {
    try {

      initUsersData.forEach(async (user, idx) => {
        const hashPassword = await hash(user.password, 10);
        initUsersData[idx].password = hashPassword;

        const role = await this.roleRepository.findOneBy({ name: user.role })

        const users = this.userRepository.create({ ...user, role })
        await this.userRepository.insert(users)
      });


      return initUsersData;
    } catch (error) {
      this.exception.handleExceptions(error);
    }
  }
}
