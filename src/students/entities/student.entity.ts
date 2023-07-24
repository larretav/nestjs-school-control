import { Attendance } from 'src/attendance/entities/attendance.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { ProfessionalCareer } from 'src/professional_careers/entities/professional_career.entity';
import { SchoolGroup } from 'src/school_groups/entities/school_group.entity';
import { SchoolSubject } from 'src/school_subjects/entities/school_subject.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany, OneToOne } from 'typeorm';

@Entity('student')
export class Student extends BaseEntity {

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => ProfessionalCareer)
  @JoinColumn({ name: 'professional_career_id' })
  professionalCareer: ProfessionalCareer;

  @Column('tinyint', {nullable: true})
  semester: number;

  @ManyToOne((type) => SchoolGroup, {nullable: true})
  @JoinColumn({ name: 'school_group_id' })
  schoolGroup: SchoolGroup;

  @ManyToMany((type) => SchoolSubject, {nullable: true})
  @JoinTable({ name: 'student_school_subject' })
  schoolSubjects: SchoolSubject[];

  @OneToMany(
    (type) => Attendance,
    (attendance) => attendance.studentId,
    { cascade: true, nullable: true }
  )
  attendances?: Attendance[];

}
