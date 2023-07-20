import { Module } from '@nestjs/common';
import { SchoolGroupsService } from './school_groups.service';
import { SchoolGroupsController } from './school_groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolGroup } from './entities/school_group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SchoolGroup
    ])
  ],
  controllers: [SchoolGroupsController],
  providers: [SchoolGroupsService],
  exports: [
    SchoolGroupsService
  ]
})
export class SchoolGroupsModule { }
