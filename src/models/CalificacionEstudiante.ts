import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EvaluacionEstudiante } from './Evaluacion_estudiantes';

@Entity('calificacion_estudiante')
export class CalificacionEstudiante {
  @PrimaryGeneratedColumn({ name: 'id_calificacion' })
  id_calificacion: number;

  @Column({ type: 'int' })
  promedio: number;

  @ManyToOne(() => EvaluacionEstudiante, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_evaluacion_estudiante' })
  evaluacion_estudiante: EvaluacionEstudiante;

  constructor() {
    this.id_calificacion = 0;
    this.promedio = 0;
  }
}

export default CalificacionEstudiante; 