import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, CreateDateColumn } from 'typeorm';
import { Pasantia } from './Pasantia'; // Asegúrate de que esta entidad exista

@Entity('evaluacion_estudiante')
@Unique(['pasantia_eval', 'ra_eval'])
export class EvaluacionEstudiante {
    @PrimaryGeneratedColumn()
    id_eval_est!: number;

    @ManyToOne(() => Pasantia, { nullable: false })
    @JoinColumn({ name: 'pasantia_eval' })
    pasantia_eval!: Pasantia;

    @Column({ type: 'varchar', length: 255, nullable: false })
    ra_eval!: string;

    @Column({ type: 'int', nullable: false })
    asistencia_eval!: number;

    @Column({ type: 'int', nullable: false })
    desempeño_eval!: number;

    @Column({ type: 'int', nullable: false })
    disponibilidad_eval!: number;

    @Column({ type: 'int', nullable: false })
    responsabilidad_eval!: number;

    @Column({ type: 'int', nullable: false })
    limpieza_eval!: number;

    @Column({ type: 'int', nullable: false })
    trabajo_equipo_eval!: number;

    @Column({ type: 'int', nullable: false })
    resolucion_problemas_eval!: number;

    @Column({ type: 'text', nullable: true })
    observaciones_eval?: string;

    @CreateDateColumn({ name: 'fecha_eval' })
    fecha_eval!: Date;

    constructor() {
        this.fecha_eval = new Date();
    }
}

export default EvaluacionEstudiante;
