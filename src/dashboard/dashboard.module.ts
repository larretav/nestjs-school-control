import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { StudentsModule } from 'src/students/students.module';
import { TeachersModule } from 'src/teachers/teachers.module';
import { SchoolSubjectsModule } from 'src/school_subjects/school_subjects.module';

@Module({
  imports: [
    StudentsModule,
    TeachersModule,
    SchoolSubjectsModule
  ],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
