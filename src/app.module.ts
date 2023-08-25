import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { SchoolGroupsModule } from './school_groups/school_groups.module';
import { AttendanceModule } from './attendance/attendance.module';
import { GradesModule } from './grades/grades.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProfessionalCareersModule } from './professional_careers/professional_careers.module';
import { SchoolSubjectsModule } from './school_subjects/school_subjects.module';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { join } from 'path';
import { Student } from './students/entities/student.entity';
import { Teacher } from './teachers/entities/teacher.entity';
import { Attendance } from './attendance/entities/attendance.entity';
import { Grade } from './grades/entities/grade.entity';
import { ProfessionalCareer } from './professional_careers/entities/professional_career.entity';
import { SchoolGroup } from './school_groups/entities/school_group.entity';
import { SchoolSubject } from './school_subjects/entities/school_subject.entity';

@Module({
  imports: [
    // Preparar las variables de entorno
    // Configuración y validación
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [
        User,
        Role,
        Student,
        Teacher,
        Attendance,
        Grade,
        ProfessionalCareer,
        SchoolGroup,
        SchoolSubject,
      ],
      dropSchema: true,
      synchronize: true // No usar en produccion, podria borrar toda la data
    }),

    AuthModule,
    RolesModule,
    StudentsModule,
    TeachersModule,
    SchoolGroupsModule,
    AttendanceModule,
    GradesModule,
    UsersModule,
    ProfessionalCareersModule,
    SchoolSubjectsModule,
    SeedModule,
    CommonModule,
    DashboardModule,
  ]
  
})
export class AppModule {
  constructor() {
  }
}
