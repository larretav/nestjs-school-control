import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { SchoolSubjectsService } from './school_subjects.service';
import { CreateSchoolSubjectDto } from './dto/create-school_subject.dto';
import { UpdateSchoolSubjectDto } from './dto/update-school_subject.dto';

@Controller('school_subjects')
export class SchoolSubjectsController {
  constructor(private readonly schoolSubjectsService: SchoolSubjectsService) { }

  @Post()
  create(@Body() createSchoolSubjectDto: CreateSchoolSubjectDto) {
    return this.schoolSubjectsService.create(createSchoolSubjectDto);
  }

  @Get()
  findAll() {
    return this.schoolSubjectsService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.schoolSubjectsService.findOne(name);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateSchoolSubjectDto: UpdateSchoolSubjectDto) {
    return this.schoolSubjectsService.update(id, updateSchoolSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.schoolSubjectsService.remove(id);
  }
}
