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

@Entity('niveles')
export class LevelsTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'plan_id', type: 'int' })
  planId: number;

  @Column({ name: 'nombre_nivel', type: 'varchar', length: 100 })
  nombreNivel: string;

  @Column({ type: 'int', nullable: true })
  orden: number;

  @Column({ name: 'duracion_meses', type: 'int', nullable: true })
  duracionMeses: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  // Relations
  @ManyToOne('PlansTypeOrmEntity', 'levels')
  @JoinColumn({ name: 'plan_id' })
  plan: any;

  @OneToMany('CyclesTypeOrmEntity', 'level')
  cycles: any[];
}
