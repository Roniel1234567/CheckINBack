import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Visita } from './Visita'; // Asegúrate de que esta entidad exista
import { Estudiante } from './Estudiante'; // Asegúrate de que esta entidad exista

@Entity('visita_estudiante')
export class VisitaEstudiante {
    @PrimaryGeneratedColumn()
    visita_est!: number;

    @ManyToOne(() => Visita, { nullable: false })
    @JoinColumn({ name: 'visita_est' })
    visita!: Visita;

    @ManyToOne(() => Estudiante, { nullable: false })
    @JoinColumn({ name: 'estudiante_vis' })
    estudiante_vis!: Estudiante;

    @Column({ type: 'text', nullable: true })
    observacion_est?: string;

    constructor(visita: Visita, estudiante_vis: Estudiante, observacion_est?: string) {
        this.visita = visita;
        this.estudiante_vis = estudiante_vis;
        this.observacion_est = observacion_est;
    }
}

export default VisitaEstudiante;