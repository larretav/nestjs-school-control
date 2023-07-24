import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('school_group')
export class SchoolGroup extends BaseEntity {

  @Column('tinyint')
  group_number: number;

  @Column('tinyint')
  school_year: number;

  @Column('char', { default: 'A' })
  status: string;
}
