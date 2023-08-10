import { Module } from '@nestjs/common';
import { SchoolSubjectsService } from './school_subjects.service';
import { SchoolSubjectsController } from './school_subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolSubject } from './entities/school_subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SchoolSubject
    ])
  ],
  controllers: [SchoolSubjectsController],
  providers: [SchoolSubjectsService],
  exports: [SchoolSubjectsService]
})
export class SchoolSubjectsModule { }
