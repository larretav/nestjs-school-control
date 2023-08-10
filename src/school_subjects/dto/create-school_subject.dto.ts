import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, Min, MinLength } from "class-validator";

export class CreateSchoolSubjectDto {

  @IsNumber({}, { message: '[subjectKey] debe ser un número' })
  subjectKey: number;

  @IsNotEmpty()
  @IsString({ message: '[name] debe ser un string' })
  @MaxLength(100, { message: '[name] debe ser menor a 100 caracteres' })
  name: string;

  @IsNumber({}, { message: '[semester] debe ser un número' })
  @Min(1, { message: '[semester] debe ser mayor a 1' })
  semester: number;

  @IsOptional()
  @IsString({ message: '[status] debe ser un string' })
  @Length(1, 1, { message: '[status] debe ser de longitud 1' })
  status?: string;
}
