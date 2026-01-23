import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('admin_leads')
export class AdminLeadsTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true })
  fecha: Date;

  @Column({ type: 'time', nullable: true })
  hora: string;

  @Column({ type: 'int', nullable: true })
  edad: number;

  @Column({ type: 'varchar', length: 255 })
  nombres: string;

  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @Column({ name: 'sede_id', type: 'int', nullable: true })
  campusId: number;

  @Column({ name: 'plan_interes_id', type: 'int', nullable: true })
  planInteresId: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  modalidad: string;

  @Column({ name: 'asesor_id', type: 'int' })
  advisorId: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  estado: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  // Relations
  @ManyToOne('CampusesTypeOrmEntity', 'adminLeads')
  @JoinColumn({ name: 'sede_id' })
  campus: any;

  @ManyToOne('UsersTypeOrmEntity', 'adminLeadsAsAdvisor')
  @JoinColumn({ name: 'asesor_id' })
  advisor: any;

  @ManyToOne('PlansTypeOrmEntity', 'adminLeads')
  @JoinColumn({ name: 'plan_interes_id' })
  planInteres: any;
}
