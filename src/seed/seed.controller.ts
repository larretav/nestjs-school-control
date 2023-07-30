import { Controller, Get, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(
    private readonly seedService: SeedService
  ) { }

  @Post()
  executeSeed() {
    // return this.seedService.runSeed();
  }

  @Post('professional_career')
  executeProfessionalCareerSeed() {
    return this.seedService.runProfessionalCareerSeed();
  }

  @Post('role')
  executeRolesSeed() {
    // return this.seedService.runProfessionalCareerSeed();
  }

  @Post('school_group')
  executeSchoolGroupSeed() {
    // return this.seedService.runProfessionalCareerSeed();
  }

  @Post('school_subject')
  executeSchoolSubjectsSeed() {
    // return this.seedService.runProfessionalCareerSeed();
  }
}
