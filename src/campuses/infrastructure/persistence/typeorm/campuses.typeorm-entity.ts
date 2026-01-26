import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PriceSedePlanTypeOrmEntity } from '../../../../plans/infrastructure/persistence/typeorm/price-sede-plan.typeorm-entity';
import { EnrollmentsTypeOrmEntity } from '../../../../enrollments/infrastructure/persistence/typeorm/enrollments.typeorm-entity';
import { PaymentsTypeOrmEntity } from '../../../../payments/infrastructure/persistence/typeorm/payments.typeorm-entity';

@Entity('sedes')
export class CampusesTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  district: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  // Relations
  @OneToMany(() => EnrollmentsTypeOrmEntity, (enrollment) => enrollment.campus)
  enrollments: EnrollmentsTypeOrmEntity[];

  @OneToMany(() => PaymentsTypeOrmEntity, (payment) => payment.campus)
  payments: PaymentsTypeOrmEntity[];

  @OneToMany('AdminLeadsTypeOrmEntity', 'campus')
  adminLeads: any[];

  @OneToMany(() => PriceSedePlanTypeOrmEntity, (price) => price.campus)
  prices: PriceSedePlanTypeOrmEntity[];
}
