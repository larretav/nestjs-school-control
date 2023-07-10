import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { SchoolSubject } from 'src/school_subjects/entities/school_subject.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Student)
  studentId: Student;

  @ManyToOne(() => SchoolSubject)
  schoolSubjectId: SchoolSubject;

  @OneToOne((type) => Teacher)
  @JoinColumn({name: 'teacher_id'})
  teacherId: Teacher;

  @Column('date', { unique: true })
  date: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

}
