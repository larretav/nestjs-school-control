import { IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class CreateRoleDto {
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1)
  status?: string;
}
