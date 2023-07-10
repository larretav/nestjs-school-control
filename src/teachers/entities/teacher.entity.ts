import { User } from 'src/common/entities/user.entity';
import { SchoolGroup } from 'src/school_groups/entities/school_group.entity';
import { SchoolSubject } from 'src/school_subjects/entities/school_subject.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, Column } from 'typeorm';

@Entity('teacher')
export class Teacher {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column(() => User)
  user: User;

  @ManyToMany((type) => SchoolGroup)
  @JoinTable()
  school_groups: SchoolGroup[];

  @ManyToMany((type) => SchoolSubject)
  @JoinTable()
  school_subjects: SchoolSubject[];
}

