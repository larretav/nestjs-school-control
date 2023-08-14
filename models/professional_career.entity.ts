
import { BaseEntity } from 'src/common/entities/base.entity';
import { SchoolSubject } from 'src/school_subjects/entities/school_subject.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('professional_career')
export class ProfessionalCareer extends BaseEntity {

  @OneToMany((type) => SchoolSubject, (schoolSubject) => schoolSubject.professionalCareer)
  schoolSubjects: SchoolSubject[]

  @Column('int', { name: 'program_number' })
  programNumber: number;

  @Column('varchar', { length: 100, unique: true })
  name: string;

  @Column('int', { name: 'number_semesters' })
  numberSemesters: number;

  @Column('char', { default: 'A' })
  status?: string;
}
