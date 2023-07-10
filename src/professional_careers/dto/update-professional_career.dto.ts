import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionalCareerDto } from './create-professional_career.dto';

export class UpdateProfessionalCareerDto extends PartialType(CreateProfessionalCareerDto) {}
