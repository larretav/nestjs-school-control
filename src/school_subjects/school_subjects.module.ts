import { Module } from '@nestjs/common';
import { SchoolSubjectsService } from './school_subjects.service';
import { SchoolSubjectsController } from './school_subjects.controller';

@Module({
  controllers: [SchoolSubjectsController],
  providers: [SchoolSubjectsService],
  exports: [SchoolSubjectsService]
})
export class SchoolSubjectsModule { }
