import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pasantia } from './Pasantia';

@Entity('evaluacion_centro_trabajo')
export class EvaluacionCentroTrabajo {
  @PrimaryGeneratedColumn()
  id_eval_centro: number;

  @ManyToOne(() => Pasantia, { nullable: false })
  @JoinColumn({ name: 'pasantia_eval_centro' })
  pasantia_eval_centro?: Pasantia;

  @Column({ type: 'int' })
  espacio_trabajo_eval: number;

  @Column({ type: 'int' })
  asignacion_tareas_eval: number;

  @Column({ type: 'int' })
  disponibilidad_dudas_eval: number;

  @Column({ type: 'text', nullable: true })
  observaciones_eval_centro?: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_eval_centro: Date;

  constructor() {
    this.id_eval_centro = 0;
    this.espacio_trabajo_eval = 0;
    this.asignacion_tareas_eval = 0;
    this.disponibilidad_dudas_eval = 0;
    this.observaciones_eval_centro = '';
    this.fecha_eval_centro = new Date();
  }
}