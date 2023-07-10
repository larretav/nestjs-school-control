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
      autoLoadEntities: true,
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
export class AppModule {}
