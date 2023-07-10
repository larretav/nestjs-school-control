import { Role } from 'src/roles/entities/role.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class User {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 45, unique: true })
  username: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { name: 'last_name', length: 50 })
  lastName: string;

  @Column('varchar', { length: 50 })
  email: string;

  @Column('varchar', { length: 30, nullable: true })
  gender: string;

  @Column('int', { nullable: true })
  age: number;

  @Column('varchar', { name: 'photo_url', length: 100 })
  photoUrl: string;

  @Column('varchar', { length: 100, nullable: true })
  password: string;

  @Column('tinyint', { name: 'email_validation', default: 0 })
  emailValidation: number;

  @Column('char', { default: 0 })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @ManyToOne((type) => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
