import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { SchoolSubject } from 'src/school_subjects/entities/school_subject.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('attendance')
export class Attendance extends BaseEntity{

  @ManyToOne(() => Student)
  studentId: Student;

  @ManyToOne(() => SchoolSubject)
  schoolSubjectId: SchoolSubject;

  @OneToOne((type) => Teacher)
  @JoinColumn({name: 'teacher_id'})
  teacherId: Teacher;

  @Column('date', { unique: true })
  date: number;

}
