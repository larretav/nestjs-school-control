import { IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateSchoolGroupDto {
  
  @IsNumber()
  @Min(0)
  groupNumber: number;

  @IsNumber()
  @Min(0)
  schoolYear: number;

  @IsString()
  @MinLength(1)
  @MaxLength(1)
  status?: string;
}
