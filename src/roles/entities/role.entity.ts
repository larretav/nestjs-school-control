import { BaseEntity } from "src/common/entities/base.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('role')
export class Role extends BaseEntity {

  @Column('varchar', { length: 50 })
  name: string;

  @Column('char', { default: 'A' })
  status: string;

  // @OneToMany(
  //   (type) => User,
  //   (user) => user.role,
  //   { cascade: true }
  // )
  // users: User[];
  
}
