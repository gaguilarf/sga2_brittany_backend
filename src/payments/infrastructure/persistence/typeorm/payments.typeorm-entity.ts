import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity('pagos')
export class PaymentsTypeOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'matricula_id', type: 'int' })
    enrollmentId: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    tipo: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    metodo: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    monto: number;

    @Column({ name: 'numero_boleta', type: 'varchar', length: 50, nullable: true })
    numeroBoleta: string;

    @Column({ name: 'fecha_pago', type: 'timestamp', nullable: true })
    fechaPago: Date;

    @Column({ name: 'sede_id', type: 'int', nullable: true })
    campusId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    // Relations
    @ManyToOne('EnrollmentsTypeOrmEntity', 'payments')
    @JoinColumn({ name: 'matricula_id' })
    enrollment: any;

    @ManyToOne('CampusesTypeOrmEntity', 'payments')
    @JoinColumn({ name: 'sede_id' })
    campus: any;
}
