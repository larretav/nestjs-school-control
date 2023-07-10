import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('school_group')
export class SchoolGroup {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('tinyint')
  group_number: number;

  @Column('tinyint')
  school_year: number;

  @Column('char', { default: '0' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
