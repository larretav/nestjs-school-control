import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne, Index } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { SchoolSubject } from 'src/school_subjects/entities/school_subject.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('attendance')
export class Attendance extends BaseEntity{

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => SchoolSubject)
  @JoinColumn({ name: 'school_subject_id' })
  schoolSubject: SchoolSubject;

  @ManyToOne((type) => Teacher)
  @JoinColumn({name: 'teacher_id'})
  teacher: Teacher;

  @Column('date')
  date: Date;

  @Index(['student', 'schoolSubject', 'teacher', 'date'], { unique: true })
  uniqueAttendance: string;

}
