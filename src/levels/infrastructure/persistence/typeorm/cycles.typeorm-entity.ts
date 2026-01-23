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

@Entity('ciclos')
export class CyclesTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nivel_id', type: 'int' })
  levelId: number;

  @Column({ name: 'nombre_ciclo', type: 'varchar', length: 100 })
  nombreCiclo: string;

  @Column({ type: 'int', nullable: true })
  orden: number;

  @Column({ name: 'duracion_meses', type: 'int', nullable: true })
  duracionMeses: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  libro: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  // Relations
  @ManyToOne('LevelsTypeOrmEntity', 'cycles')
  @JoinColumn({ name: 'nivel_id' })
  level: any;

  @OneToMany('GroupsTypeOrmEntity', 'cycle')
  groups: any[];

  @OneToMany('EnrollmentsTypeOrmEntity', 'cycle')
  enrollments: any[];

  @OneToMany('StudentProgressTypeOrmEntity', 'cycle')
  progressRecords: any[];
}
