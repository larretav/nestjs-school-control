import { Module } from '@nestjs/common';
import { ProfessionalCareersService } from './professional_careers.service';
import { ProfessionalCareersController } from './professional_careers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalCareer } from './entities/professional_career.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfessionalCareer])
  ],
  controllers: [ProfessionalCareersController],
  providers: [ProfessionalCareersService],
  exports: [ProfessionalCareersService]
})
export class ProfessionalCareersModule {}
