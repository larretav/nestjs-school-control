import { IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateSchoolGroupDto {

  @IsNumber()
  @IsPositive()
  @Min(1)
  groupNumber: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  schoolYear: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1)
  status?: string;
}
