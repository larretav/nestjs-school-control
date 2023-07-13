import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessionalCareersService } from './professional_careers.service';
import { CreateProfessionalCareerDto } from './dto/create-professional_career.dto';
import { UpdateProfessionalCareerDto } from './dto/update-professional_career.dto';

@Controller('professional_careers')
export class ProfessionalCareersController {
  constructor(private readonly professionalCareersService: ProfessionalCareersService) {}

  @Post()
  create(@Body() createProfessionalCareerDto: CreateProfessionalCareerDto) {
    return this.professionalCareersService.create(createProfessionalCareerDto);
  }

  @Get()
  findAll() {
    return this.professionalCareersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalCareersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessionalCareerDto: UpdateProfessionalCareerDto) {
    return this.professionalCareersService.update(+id, updateProfessionalCareerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalCareersService.remove(+id);
  }
}
