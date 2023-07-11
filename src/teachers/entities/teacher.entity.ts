import { SchoolGroup } from 'src/school_groups/entities/school_group.entity';
import { SchoolSubject } from 'src/school_subjects/entities/school_subject.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn,ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';

@Entity('teacher')
export class Teacher {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => User)
  @JoinColumn({name: 'user_id'})
  user: User;

  @ManyToMany((type) => SchoolGroup)
  @JoinTable()
  school_groups: SchoolGroup[];

  @ManyToMany((type) => SchoolSubject)
  @JoinTable()
  school_subjects: SchoolSubject[];
}

