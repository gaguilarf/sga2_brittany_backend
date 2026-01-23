import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('progreso_alumno')
export class StudentProgressTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'alumno_id', type: 'int' })
  studentId: number;

  @Column({ name: 'matricula_id', type: 'int' })
  enrollmentId: number;

  @Column({ name: 'grupo_id', type: 'int' })
  groupId: number;

  @Column({ name: 'ciclo_id', type: 'int' })
  cycleId: number;

  @Column({ name: 'nivel_id', type: 'int' })
  levelId: number;

  @Column({
    name: 'estado_ciclo',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  estadoCiclo: string; // En curso, Aprobado, Reprobado

  @Column({ name: 'fecha_inicio_ciclo', type: 'date', nullable: true })
  fechaInicioCiclo: Date;

  @Column({ name: 'fecha_fin_ciclo', type: 'date', nullable: true })
  fechaFinCiclo: Date;

  @Column({
    name: 'nota_final',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  notaFinal: number;

  @Column({
    name: 'asistencia_porcentaje',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  asistenciaPorcentaje: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  // Relations
  @ManyToOne('StudentsTypeOrmEntity', 'progressRecords')
  @JoinColumn({ name: 'alumno_id' })
  student: any;

  @ManyToOne('EnrollmentsTypeOrmEntity', 'progressRecords')
  @JoinColumn({ name: 'matricula_id' })
  enrollment: any;

  @ManyToOne('GroupsTypeOrmEntity', 'progressRecords')
  @JoinColumn({ name: 'grupo_id' })
  group: any;

  @ManyToOne('CyclesTypeOrmEntity', 'progressRecords')
  @JoinColumn({ name: 'ciclo_id' })
  cycle: any;

  @ManyToOne('LevelsTypeOrmEntity', 'progressRecords')
  @JoinColumn({ name: 'nivel_id' })
  level: any;
}
