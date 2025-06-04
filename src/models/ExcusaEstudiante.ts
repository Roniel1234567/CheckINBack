import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pasantia } from './Pasantia';
import { Tutor } from './Tutor';
import { Estudiante } from './Estudiante';

@Entity('excusa_estudiante')
export class ExcusaEstudiante {
  @PrimaryGeneratedColumn({ name: 'id_excusa' })
  id_excusa!: number;

  @Column({ type: 'text', name: 'justificacion_excusa' })
  justificacion_excusa!: string;

  @Column({ type: 'timestamp', name: 'fecha_creacion_excusa', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion_excusa!: Date;

  @ManyToOne(() => Pasantia, { nullable: false })
  @JoinColumn({ name: 'id_pasantia', referencedColumnName: 'id_pas' })
  pasantia!: Pasantia;

  @ManyToOne(() => Tutor, { nullable: false })
  @JoinColumn({ name: 'id_tutor', referencedColumnName: 'id_tutor' })
  tutor!: Tutor;

  @ManyToOne(() => Estudiante, { nullable: false })
  @JoinColumn({ name: 'id_estudiante', referencedColumnName: 'documento_id_est' })
  estudiante!: Estudiante;

  @Column({ type: 'bytea', nullable: true })
  certificados?: Buffer;
} 