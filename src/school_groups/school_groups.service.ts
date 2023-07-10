import { Injectable } from '@nestjs/common';
import { CreateSchoolGroupDto } from './dto/create-school_group.dto';
import { UpdateSchoolGroupDto } from './dto/update-school_group.dto';

@Injectable()
export class SchoolGroupsService {
  create(createSchoolGroupDto: CreateSchoolGroupDto) {
    return 'This action adds a new schoolGroup';
  }

  findAll() {
    return `This action returns all schoolGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schoolGroup`;
  }

  update(id: number, updateSchoolGroupDto: UpdateSchoolGroupDto) {
    return `This action updates a #${id} schoolGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} schoolGroup`;
  }
}
