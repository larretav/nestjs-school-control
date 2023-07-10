import { Module } from '@nestjs/common';
import { SchoolGroupsService } from './school_groups.service';
import { SchoolGroupsController } from './school_groups.controller';

@Module({
  controllers: [SchoolGroupsController],
  providers: [SchoolGroupsService]
})
export class SchoolGroupsModule {}
