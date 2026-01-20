import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('matriculas')
export class EnrollmentsTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'alumno_id', type: 'int' })
  studentId: number;

  @Column({ name: 'sede_id', type: 'int' })
  campusId: number;

  @Column({ name: 'plan_id', type: 'int' })
  planId: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  modalidad: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  horario: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nivel: string;

  @Column({
    name: 'tipo_inscripcion',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  tipoInscripcion: string;

  @Column({ name: 'asesor_id', type: 'int' })
  advisorId: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  origen: string;

  @Column({
    name: 'numero_boleta',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  numeroBoleta: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  saldo: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  // Relations
  @ManyToOne('StudentsTypeOrmEntity', 'enrollments')
  @JoinColumn({ name: 'alumno_id' })
  student: any;

  @ManyToOne('CampusesTypeOrmEntity', 'enrollments')
  @JoinColumn({ name: 'sede_id' })
  campus: any;

  @ManyToOne('PlansTypeOrmEntity', 'enrollments')
  @JoinColumn({ name: 'plan_id' })
  plan: any;

  @ManyToOne('UsersTypeOrmEntity', 'enrollmentsAsAdvisor')
  @JoinColumn({ name: 'asesor_id' })
  advisor: any;

  @OneToMany('PaymentsTypeOrmEntity', 'enrollment')
  payments: any[];
}
