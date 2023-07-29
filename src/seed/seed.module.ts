import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ProfessionalCareer } from 'src/professional_careers/entities/professional_career.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      ProfessionalCareer
    ])
  ],
  controllers: [SeedController],
  providers: [SeedService]
})
export class SeedModule {}
