import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateStudentDto extends CreateUserDto {

  // @IsNotEmpty({ message: '[userKey] no debe ser vacío.' })
  // @IsString({ message: '[userKey] debe ser un string.' })
  // @MinLength(4, { message: 'La longitud de [userKey] debe ser mayor a 4.' })
  // userKey: string;

  @IsNotEmpty({ message: '[professionalCareer] no debe ser vacío.' })
  @IsString({ message: '[professionalCareer] debe ser un string.' })
  professionalCareer: string;

  role = 'student';


  // @IsNotEmpty({message: '[firstName] no debe ser vacío.'})
  // @IsString({ message: '[firstName] debe ser un string.' })
  // @MaxLength(50, { message: 'La longitud máxima de [name] es de 50 caracteres.' })
  // firstName: string;

  // @IsNotEmpty({message: '[lastName] no debe ser vacío.'})
  // @IsString({ message: '[lastName] debe ser un string.' })
  // @MaxLength(45, { message: 'La longitud máxima de [lastName] es de 50 caracteres.' })
  // lastName: string;

  // @IsNotEmpty({message: '[birthdate] no debe ser vacío.'})
  // @IsDateString({}, {message: '[birthdate] no tiene un formato de fecha válido.'})
  // birthdate: string;

  // @IsNotEmpty({message: '[gender] no debe ser vacío.'})
  // @IsIn(['hombre', 'mujer', 'no binario'])
  // gender: string;

  // @IsNotEmpty({message: '[email] no debe ser vacío.'})
  // @IsEmail({}, { message: '[email] no tiene un formato válido.' })
  // @MaxLength(50, { message: 'La longitud máxima de [email] es de 50 caracteres.' })
  // email: string;

  // @IsNotEmpty({message: '[password] no debe ser vacío.'})
  // @IsString({ message: '[password] debe ser un string.' })
  // @MinLength(8, { message: 'La longitud de [password] debe ser mayor a 8.' })
  // @MaxLength(45, { message: 'La longitud máxima de [password] es de 45 caracteres.' })
  // password: string;
}

