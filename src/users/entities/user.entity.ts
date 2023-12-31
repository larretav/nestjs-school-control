import { BaseEntity } from 'src/common/entities/base.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {

  @Column('varchar', { length: 45, unique: true })
  userKey: string;

  @Column('varchar', { name: 'first_name', length: 50 })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 50 })
  lastName: string;

  @Column('varchar', { length: 50 })
  email: string;

  @Column('varchar', { length: 30, nullable: true })
  gender: string;

  @Column('date', { nullable: true })
  birthdate: Date;

  @Column('longtext', { name: 'photo_url', nullable: true })
  photoUrl: string;

  @Column('varchar', { length: 100})
  password: string;

  @Column('tinyint', { name: 'email_validation', default: 0, nullable: true })
  emailValidation: number;

  @Column('char', { default: 'A' })
  status: string;

  @ManyToOne((type) => Role, (role) => role.name, { eager: true })
  role: Role;
}
