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

@Entity('notas')
export class GradesTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'alumno_id', type: 'int' })
  studentId: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ciclo: string;

  @Column({ type: 'int', nullable: true })
  mes: number;

  @Column({ type: 'int', nullable: true })
  año: number;

  @Column({
    name: 'nota_final',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  notaFinal: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  // Relations
  @ManyToOne('StudentsTypeOrmEntity', 'grades')
  @JoinColumn({ name: 'alumno_id' })
  student: any;

  @OneToMany('GradeDetailsTypeOrmEntity', 'grade')
  details: any[];
}
