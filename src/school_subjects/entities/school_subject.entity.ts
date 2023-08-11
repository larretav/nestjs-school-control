import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('school_subjects')
@Index(['subjectKey', 'name'], { unique: true })
export class SchoolSubject extends BaseEntity {

  @Column('int', { name: 'subject_key' })
  subjectKey: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('tinyint', {nullable: false})
  semester: number;

  @Column('char', { default: 'A', nullable: true })
  status: string;
}
