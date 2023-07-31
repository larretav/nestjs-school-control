import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ProfessionalCareer } from 'src/professional_careers/entities/professional_career.entity';
import { Role } from 'src/roles/entities/role.entity';
import { SchoolGroup } from 'src/school_groups/entities/school_group.entity';
import { SchoolSubject } from 'src/school_subjects/entities/school_subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      ProfessionalCareer,
      Role,
      SchoolGroup,
      SchoolSubject
    ])
  ],
  controllers: [SeedController],
  providers: [SeedService]
})
export class SeedModule {}
