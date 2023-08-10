import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateStudentDto extends CreateUserDto {

  @IsNotEmpty({ message: '[professionalCareer] no debe ser vacío.' })
  @IsString({ message: '[professionalCareer] debe ser un string.' })
  professionalCareer: string;

  role = 'student';
}

