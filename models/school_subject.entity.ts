
import { BaseEntity } from 'src/common/entities/base.entity';
import { ProfessionalCareer } from 'src/professional_careers/entities/professional_career.entity';
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('school_subjects')
@Index(['subjectKey', 'name'], { unique: true })
export class SchoolSubject extends BaseEntity {

  @ManyToOne((type) => ProfessionalCareer, (profCareer)=> profCareer.schoolSubjects, { nullable: false, eager: true })
  @JoinColumn({ name: 'professional_career_id' })
  professionalCareer: ProfessionalCareer;

  @Column('int', { name: 'subject_key' })
  subjectKey: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('tinyint', {nullable: false})
  semester: number;

  @Column('char', { default: 'A', nullable: true })
  status: string;
}
