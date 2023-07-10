import { PartialType } from '@nestjs/mapped-types';
import { CreateSchoolGroupDto } from './create-school_group.dto';

export class UpdateSchoolGroupDto extends PartialType(CreateSchoolGroupDto) {}
