export class CreateStudentDto { 
//   @PrimaryGeneratedColumn('uuid')
//   id: number;

//   @OneToOne(() => User)
//   @JoinColumn({name: 'user_id'})
//   user: User;

//   @ManyToOne((type) => ProfessionalCareer)
//   @JoinColumn({ name: 'professional_career_id' })
//   professionalCareer: ProfessionalCareer;

//   @Column('tinyint')
//   semester: number;

//   @ManyToMany((type) => SchoolGroup)
//   @JoinTable()
//   school_groups: SchoolGroup[];

//   @ManyToMany((type) => SchoolSubject)
//   @JoinTable()
//   school_subjects: SchoolSubject[];

//   @OneToMany(
//     (type) => Attendance,
//     (attendance) => attendance.studentId,
//     { cascade: true }
//   )
//   attendances: Attendance[];
}

