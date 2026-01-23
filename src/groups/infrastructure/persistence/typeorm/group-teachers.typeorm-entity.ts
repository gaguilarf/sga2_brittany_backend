import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('grupo_docentes')
export class GroupTeachersTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'grupo_id', type: 'int' })
  groupId: number;

  @Column({ name: 'docente_id', type: 'int' })
  teacherId: number;

  @Column({
    name: 'tipo_asignacion',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  tipoAsignacion: string; // Principal, Suplente, Ayudante

  @Column({ name: 'fecha_inicio', type: 'date', nullable: true })
  fechaInicio: Date;

  @Column({ name: 'fecha_fin', type: 'date', nullable: true })
  fechaFin: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  estado: string; // Activo, Inactivo

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  // Relations
  @ManyToOne('GroupsTypeOrmEntity', 'groupTeachers')
  @JoinColumn({ name: 'grupo_id' })
  group: any;

  @ManyToOne('UsersTypeOrmEntity', 'attendancesAsTeacher') // Using an existing relation name from Users if appropriate, or updating Users
  @JoinColumn({ name: 'docente_id' })
  teacher: any;
}
