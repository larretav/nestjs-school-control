import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('school_subjects')
export class SchoolSubject {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', {length: 100} )
  name: string;

  @Column('tinyint')asasda
  semester: number;

  @Column('char', {default: '0'})
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
