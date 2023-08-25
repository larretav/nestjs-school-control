import { Attendance } from 'src/attendance/entities/attendance.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { ProfessionalCareer } from 'src/professional_careers/entities/professional_career.entity';
import { SchoolGroup } from 'src/school_groups/entities/school_group.entity';
import { SchoolSubject } from 'src/school_subjects/entities/school_subject.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany, OneToOne } from 'typeorm';

@Entity('student')
export class Student extends BaseEntity {

  @OneToOne(() => User, { nullable: false, eager: true, cascade: ['update'] })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => ProfessionalCareer, { nullable: false })
  @JoinColumn({ name: 'professional_career_id' })
  professionalCareer: ProfessionalCareer;

  @Column('tinyint', { nullable: true })
  semester: number;

  @ManyToOne((type) => SchoolGroup, { nullable: true })
  @JoinColumn({ name: 'school_group_id' })
  schoolGroup: SchoolGroup;

  @ManyToMany((type) => SchoolSubject, { cascade: true })
  @JoinTable({ name: 'student_school_subject' })
  schoolSubjects: SchoolSubject[];

  @OneToMany(
    (type) => Attendance,
    (attendance) => attendance.student,
    { cascade: true }
  )
  attendances: Attendance[];

}


const student = {
  semester: 'Un número aleatorio del 1 al 9',
  user: {
    userKey: 'Un numero aleatorio de 5 digitos',
    firstName: 'Un nombre de nacionalidad mexicana',
    lastName: 'Dos apellidos de nacionalidad mexicana (separados por un espacio en blanco)',
    email: 'Se conformará por el nombre, las primeras dos letras de cada apellido seguido de @gmail.com',
    gender: 'Un valor aleatorio entre "hombre", "mujer" o "no binario"',
    birthdate: 'Una fecha aleatoria menor a 2005 (solo fecha en formato yyyy-mm-dd)',
    photoUrl: 'Aqui irá este valor estático: "https://res.cloudinary.com/dwzkbzepk/image/upload/v1652135443/44-442954_trolls-movie-party-branch-blue-troll-from-trolls_gfvgcg.png"',
    password: 'La contraseña será el siguiente valor estático: "1234Tamarindo"',
    emailValidation: 0,
    role: {
      name: 'Valor aleatorio entre "student" y "teacher"'
    }
  },
  professionalCareer: {
    programNumber: 'Un numero aleatorio de 5 digitos',
    name: '',
    numberSemesters: ''
  },
  schoolGroup: {
    groupNumber: '',
    schoolYear: ''
  },
  schoolSubjects: {
    subjectKey: '',
    name: '',
    semester: ''
  },
  attendances: {
    student: '',
    schoolSubject: '',
    teacher: '',
    date: '',
  },
}