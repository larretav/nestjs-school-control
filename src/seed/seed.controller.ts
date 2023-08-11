import { Controller, Get, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(
    private readonly seedService: SeedService
  ) { }

  @Post('all')
  executeAllSeed() {
    return this.seedService.runAllSeed();
  }

  @Post('professional_career')
  executeProfessionalCareerSeed() {
    return this.seedService.runProfessionalCareerSeed();
  }

  @Post('role')
  executeRolesSeed() {
    return this.seedService.runRolesSeed();
  }

  @Post('school_group')
  executeSchoolGroupSeed() {
    return this.seedService.runProfessionalCareerSeed();
  }

  @Post('school_subject')
  executeSchoolSubjectsSeed() {
    return this.seedService.runSchoolSubjectSeed();
  }

  @Post('users')
  executeUsersSeed() {
    return this.seedService.runUsersSeed();
  }
}
