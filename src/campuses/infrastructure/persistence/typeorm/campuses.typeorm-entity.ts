import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

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
    @OneToMany('EnrollmentsTypeOrmEntity', 'campus')
    enrollments: any[];

    @OneToMany('PaymentsTypeOrmEntity', 'campus')
    payments: any[];

    @OneToMany('AdminLeadsTypeOrmEntity', 'campus')
    adminLeads: any[];

    @OneToMany('PlansCampusesTypeOrmEntity', 'campus')
    plansCampuses: any[];
}
