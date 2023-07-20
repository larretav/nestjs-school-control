import { IsBoolean, IsDate, IsEmail, IsIn, IsNumber, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsIn(['hombre', 'mujer', 'no binario'])
  gender: string;

  @IsDate()
  date: Date;

  @IsString()
  photoUrl: string;

  @IsString()
  password: string;

  @IsBoolean()
  emailValidation: number;

  @IsString()
  status?: string;

  @IsNumber()
  roleId: number;
}
