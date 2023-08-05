import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ProfessionalCareersModule } from 'src/professional_careers/professional_careers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    UsersModule,
    ProfessionalCareersModule
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
