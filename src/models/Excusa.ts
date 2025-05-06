import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Pasantia } from './Pasantia';

@Entity('excusa')
export class Excusa {
  @PrimaryGeneratedColumn()
  id_exc: number;

  @ManyToOne(() => Pasantia)
  @JoinColumn({ name: 'pasantia_exc' })
  pasantia_exc: Pasantia;

  @Column({ type: 'date' })
  fecha_exc: Date;

  @Column({ type: 'varchar', default: 'Inasistencia' })
  tipo_exc: string;

  @Column({ type: 'text' })
  justificacion_exc: string;

  @Column({ type: 'time', nullable: true })
  hora_salida?: string;

  @Column({ type: 'time', nullable: true })
  hora_vuelta?: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  tiempo_salida?: number;

  @CreateDateColumn({ type: 'timestamp' })
  creacion_exc: Date;

  constructor() {
    this.id_exc = 0;
    this.pasantia_exc = new Pasantia();
    this.fecha_exc = new Date();
    this.tipo_exc = 'Inasistencia';
    this.justificacion_exc = '';
    this.hora_salida = '';
    this.hora_vuelta = '';
    this.tiempo_salida = 0;
    this.creacion_exc = new Date();
  }
}