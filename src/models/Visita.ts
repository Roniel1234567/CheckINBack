import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Tutor } from './Tutor'; // Asegúrate de que esta entidad exista
import { CentroDeTrabajo } from './CentroDeTrabajo'; // Asegúrate de que esta entidad exista

@Entity('visita')
export class Visita {
    @PrimaryGeneratedColumn()
    id_vis!: number;

    @ManyToOne(() => Tutor, { nullable: false })
    @JoinColumn({ name: 'tutor_vis' })
    tutor_vis!: Tutor;

    @ManyToOne(() => CentroDeTrabajo, { nullable: false })
    @JoinColumn({ name: 'centro_vis' })
    centro_vis!: CentroDeTrabajo;

    @Column({ type: 'varchar', length: 255, nullable: false })
    motivo_vis!: string;

    @Column({ type: 'date', nullable: false })
    fecha_vis!: Date;

    @Column({ type: 'time', nullable: true })
    hora_vis?: string;

    @Column({ type: 'text', nullable: true })
    observacion_vis?: string;

    @CreateDateColumn({ name: 'creacion_vis' })
    creacion_vis!: Date;

    constructor(
        tutor_vis: Tutor,
        centro_vis: CentroDeTrabajo,
        motivo_vis: string,
        fecha_vis: Date,
        hora_vis?: string,
        observacion_vis?: string
    ) {
        this.tutor_vis = tutor_vis;
        this.centro_vis = centro_vis;
        this.motivo_vis = motivo_vis;
        this.fecha_vis = fecha_vis;
        this.hora_vis = hora_vis;
        this.observacion_vis = observacion_vis;
        this.creacion_vis = new Date();
    }
}

export default Visita;