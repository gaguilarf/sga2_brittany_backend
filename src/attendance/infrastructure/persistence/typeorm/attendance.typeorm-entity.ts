import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('asistencia')
export class AttendanceTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'alumno_id', type: 'int' })
  studentId: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  estado: string;

  @Column({ name: 'docente_id', type: 'int' })
  teacherId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  // Relations
  @ManyToOne('StudentsTypeOrmEntity', 'attendances')
  @JoinColumn({ name: 'alumno_id' })
  student: any;

  @ManyToOne('UsersTypeOrmEntity', 'attendancesAsTeacher')
  @JoinColumn({ name: 'docente_id' })
  teacher: any;
}
