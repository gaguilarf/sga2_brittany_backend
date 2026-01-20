import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('notas_detalle')
export class GradeDetailsTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nota_id', type: 'int' })
  gradeId: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  apartado: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  puntaje: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  // Relations
  @ManyToOne('GradesTypeOrmEntity', 'details')
  @JoinColumn({ name: 'nota_id' })
  grade: any;
}
