import { Module } from '@nestjs/common';
import { ProfessionalCareersService } from './professional_careers.service';
import { ProfessionalCareersController } from './professional_careers.controller';

@Module({
  controllers: [ProfessionalCareersController],
  providers: [ProfessionalCareersService]
})
export class ProfessionalCareersModule {}
