import { BaseEntity } from 'src/common/entities/base.entity';
import { SchoolGroup } from 'src/school_groups/entities/school_group.entity';
import { SchoolSubject } from 'src/school_subjects/entities/school_subject.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn,ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';

@Entity('teacher')
export class Teacher extends BaseEntity {

  @OneToOne(() => User)
  @JoinColumn({name: 'user_id'})
  user: User;

  @ManyToMany((type) => SchoolGroup)
  @JoinTable({name: 'teacher_school_groups'})
  schoolGroups: SchoolGroup[];

  @ManyToMany((type) => SchoolSubject)
  @JoinTable({name: 'teacher_school_subjects'})
  schoolSubjects: SchoolSubject[];
}

