import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pasantia } from './Pasantia';
import { CalificacionEstudiante } from './CalificacionEstudiante';

export type EstadoModuloTipo = 'Aprobado' | 'Reprobado';

@Entity('modulo_pasantia')
export class ModuloPasantia {
  @PrimaryGeneratedColumn({ name: 'id_modulo' })
  id_modulo!: number;

  @Column({
    type: 'enum',
    enum: ['Aprobado', 'Reprobado'],
    name: 'estado_modulo',
  })
  estado_modulo!: EstadoModuloTipo;

  @ManyToOne(() => Pasantia, { nullable: false })
  @JoinColumn({ name: 'id_pasantia', referencedColumnName: 'id_pas' })
  pasantia!: Pasantia;

  @ManyToOne(() => CalificacionEstudiante, { nullable: false })
  @JoinColumn({ name: 'id_calificacion_estudiante', referencedColumnName: 'id_calificacion' })
  calificacion_estudiante!: CalificacionEstudiante;
} 