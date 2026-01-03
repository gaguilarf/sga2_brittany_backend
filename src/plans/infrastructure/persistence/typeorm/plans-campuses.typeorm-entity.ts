import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity('planes_sedes')
export class PlansCampusesTypeOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'sede_id', type: 'int' })
    campusId: number;

    @Column({ name: 'plan_id', type: 'int' })
    planId: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    price: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    // Relations
    @ManyToOne('CampusesTypeOrmEntity', 'plansCampuses')
    @JoinColumn({ name: 'sede_id' })
    campus: any;

    @ManyToOne('PlansTypeOrmEntity', 'plansCampuses')
    @JoinColumn({ name: 'plan_id' })
    plan: any;
}
