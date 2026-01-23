import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('user_sedes')
export class UserCampusesTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ name: 'sede_id', type: 'int' })
  campusId: number;

  @Column({
    name: 'acceso_total',
    type: 'boolean',
    default: false,
  })
  accesoTotal: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  // Relations
  @ManyToOne('UsersTypeOrmEntity', 'userCampuses')
  @JoinColumn({ name: 'user_id' })
  user: any;

  @ManyToOne('CampusesTypeOrmEntity', 'userCampuses')
  @JoinColumn({ name: 'sede_id' })
  campus: any;
}
