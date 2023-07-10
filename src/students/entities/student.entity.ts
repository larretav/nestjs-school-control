import { Attendance } from 'src/attendance/entities/attendance.entity';
import { User } from 'src/common/entities/user.entity';
import { ProfessionalCareer } from 'src/professional_careers/entities/professional_career.entity';
import { SchoolGroup } from 'src/school_groups/entities/school_group.entity';
import { SchoolSubject } from 'src/school_subjects/entities/school_subject.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column(()=> User)
  user: User;

  @ManyToOne((type) => ProfessionalCareer)
  @JoinColumn({ name: 'professional_career_id' })
  professionalCareer: ProfessionalCareer;

  @Column('tinyint')
  semester: number;

  @ManyToMany((type) => SchoolGroup)
  @JoinTable()
  school_groups: SchoolGroup[];

  @ManyToMany((type) => SchoolSubject)
  @JoinTable()
  school_subjects: SchoolSubject[];

  @OneToMany(
    (type) => Attendance,
    (attendance) => attendance.studentId,
    { cascade: true }
  )
  attendances: Attendance[];

}
