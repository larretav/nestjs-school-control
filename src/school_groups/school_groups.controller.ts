import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchoolGroupsService } from './school_groups.service';
import { CreateSchoolGroupDto } from './dto/create-school_group.dto';
import { UpdateSchoolGroupDto } from './dto/update-school_group.dto';

@Controller('school_groups')
export class SchoolGroupsController {
  constructor(private readonly schoolGroupsService: SchoolGroupsService) {}

  @Post()
  create(@Body() createSchoolGroupDto: CreateSchoolGroupDto) {
    return this.schoolGroupsService.create(createSchoolGroupDto);
  }

  @Get()
  findAll() {
    return this.schoolGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolGroupDto: UpdateSchoolGroupDto) {
    return this.schoolGroupsService.update(+id, updateSchoolGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolGroupsService.remove(+id);
  }
}
