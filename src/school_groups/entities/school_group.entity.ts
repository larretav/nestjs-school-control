import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('school_group')
export class SchoolGroup extends BaseEntity {

  @Column('tinyint', {name: 'group_number'})
  groupNumber: number;

  @Column('tinyint',{name: 'school_year'})
  schoolYear: number;

  @Column('char', { default: 'A' })
  status: string;
}
