import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('professional_career')
export class ProfessionalCareer {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('int')
  program_number: number;

  @Column('varchar', {length: 100})
  name: string;

  @Column('int')
  number_semesters: number;

  @Column('char', {default: '0'})
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
