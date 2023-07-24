import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateStudentDto { 

  @IsUUID('all', {message: '[user] no es un UUID válido'})
  user: string;

  @IsUUID('all', {message: '[professionalCareer] no es un UUID válido'})
  professionalCareer: number;

  @IsNumber()
  semester: number;

  @IsUUID('all', {message: '[schoolGroup] no es un UUID válido'})
  schoolGroup: number;

  @IsString({ each: true })
  schoolSubjectIds?: string[];
}

