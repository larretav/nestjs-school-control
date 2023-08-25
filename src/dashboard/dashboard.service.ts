import { Injectable } from '@nestjs/common';
import { SchoolSubjectsService } from 'src/school_subjects/school_subjects.service';
import { StudentsService } from 'src/students/students.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { IStatisticsSummary } from './interfaces/statistics-summary.interface';

@Injectable()
export class DashboardService {
  constructor(
    private readonly studentService: StudentsService,
    private readonly teacherService: TeachersService,
    private readonly schoolSubjectService: SchoolSubjectsService,
  ) { }


  async findAll() {
    const students = await this.studentService.findAll();
    const teachers = await this.teacherService.findAll();
    const schoolSubjects = await this.schoolSubjectService.findAll();

    const summary: IStatisticsSummary = {
      students: students.length,
      teachers: 0, //TODO: teachers.length,
      schoolSubjects: schoolSubjects.length
    }

    return summary;

  }

}
