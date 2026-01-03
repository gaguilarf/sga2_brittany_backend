import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

@Entity('alumnos')
export class StudentsTypeOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;

    @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
    dni: string;

    @Column({ name: 'fecha_nacimiento', type: 'date', nullable: true })
    fechaNacimiento: Date;

    @Column({ type: 'int', nullable: true })
    edad: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    distrito: string;

    @Column({ name: 'celular_alumno', type: 'varchar', length: 20, nullable: true })
    celularAlumno: string;

    @Column({ name: 'celular_apoderado', type: 'varchar', length: 20, nullable: true })
    celularApoderado: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    correo: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    // Relations
    @OneToMany('EnrollmentsTypeOrmEntity', 'student')
    enrollments: any[];

    @OneToMany('GradesTypeOrmEntity', 'student')
    grades: any[];

    @OneToMany('AttendanceTypeOrmEntity', 'student')
    attendances: any[];
}
