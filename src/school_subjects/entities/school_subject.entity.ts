import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('school_subjects')
export class SchoolSubject extends BaseEntity {

  @Column('varchar', {length: 100} )
  name: string;

  @Column('tinyint')
  semester: number;

  @Column('char', {default: 'A'})
  status: string;
}
