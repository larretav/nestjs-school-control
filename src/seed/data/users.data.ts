import { CreateUserDto } from "src/users/dto/create-user.dto";

export const initUsersData: CreateUserDto[] = [
  {
    userKey: 'yakasawa',
    password: 'yaka1234',
    firstName: 'Jesús',
    lastName: 'de Chamberí',
    email: 'yaka@gmail.com',
    gender: 'hombre',
    birthdate: '1995-10-11',
    photoUrl: 'https://res.cloudinary.com/dwzkbzepk/image/upload/v1652135443/44-442954_trolls-movie-party-branch-blue-troll-from-trolls_gfvgcg.png',
    role: 'admin'
  },
  {
    userKey: 'larretav',
    password: '123tamarindo',
    firstName: 'Alejandro',
    lastName: 'Larreta',
    email: 'admin@admin.com',
    gender: 'hombre',
    birthdate: '1995-10-11',
    photoUrl: 'https://res.cloudinary.com/dwzkbzepk/image/upload/v1652135443/44-442954_trolls-movie-party-branch-blue-troll-from-trolls_gfvgcg.png',
    role: 'admin'
  },
  {
    userKey: 'laurad',
    password: 'laurad',
    firstName: 'Laura',
    lastName: 'Díaz',
    email: 'laura@gmail.com',
    gender: 'no binario',
    birthdate: '1995-10-11',
    photoUrl: 'https://res.cloudinary.com/dwzkbzepk/image/upload/v1652135443/44-442954_trolls-movie-party-branch-blue-troll-from-trolls_gfvgcg.png',
    role: 'admin'
  },
]