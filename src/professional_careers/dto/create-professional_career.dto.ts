import { IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateProfessionalCareerDto {

  @IsNumber()
  @Min(0)
  programNumber: number;

  @IsString()
  @MinLength(0)
  @MaxLength(100)
  name: string;

  @IsNumber()
  numberSemesters: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1)
  status?: string;
}
