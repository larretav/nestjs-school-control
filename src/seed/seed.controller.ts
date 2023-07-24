import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(
    private readonly seedService: SeedService
  ) { }

  @Get()
  executeSeed() {
    return this.seedService.runSeed();
  }

  @Get('professional_career')
  executeProfessionalCareerSeed() {
    return this.seedService.runProfessionalCareerSeed();
  }
}
