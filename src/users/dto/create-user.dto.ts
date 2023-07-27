import { IsBoolean, IsDate, IsDateString, IsEmail, IsIn, IsInstance, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength, isInstance } from "class-validator";
import { Role } from "src/roles/entities/role.entity";

export class CreateUserDto {

  @IsString({ message: '[username] debe ser un string' })
  @MinLength(1, { message: 'La longitud de [username] debe ser mayor a 1' })
  username: string;

  @IsString({ message: '[password] debe ser un string' })
  @MinLength(1, { message: 'La longitud de [password] debe ser mayor a 1' })
  @MaxLength(45, { message: 'La longitud máxima de [password] es de 45 caracteres' })
  password: string;

  @IsString({ message: '[name] debe ser un string' })
  @MaxLength(50, { message: 'La longitud máxima de [name] es de 50 caracteres' })
  name: string;

  @IsString({ message: '[lastName] debe ser un string' })
  @MaxLength(45, { message: 'La longitud máxima de [lastName] es de 50 caracteres' })
  lastName: string;

  @IsEmail({}, { message: '[email] no tiene un formato válido' })
  @MaxLength(45, { message: 'La longitud máxima de [email] es de 50 caracteres' })
  email: string;

  @IsIn(['hombre', 'mujer', 'no binario'])
  gender: string;

  @IsDateString()
  birthdate: string;

  @IsOptional()
  @IsString({ message: '[photoUrl] debe ser un string' })
  photoUrl?: string;

  @IsOptional()
  status?: string;

  @IsInstance(Role)
  role: Role;

}
