import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Estudiante } from './Estudiante';
import { CentroDeTrabajo } from './CentroDeTrabajo';
import { Supervisor } from './Supervisor';

// Enum para estado de pasantía
export enum EstadoPasantia {
  PENDIENTE = 'Pendiente',
  EN_PROCESO = 'En Proceso',
  TERMINADA = 'Terminada',
  CANCELADA = 'Cancelada'
}

@Entity('pasantia')
export class Pasantia {
  @PrimaryGeneratedColumn()
  id_pas: number;

  @ManyToOne(() => Estudiante)
  @JoinColumn({ name: 'estudiante_pas' })
  estudiante_pas: Estudiante;

  @ManyToOne(() => CentroDeTrabajo)
  @JoinColumn({ name: 'centro_pas' })
  centro_pas: CentroDeTrabajo;

  @ManyToOne(() => Supervisor)
  @JoinColumn({ name: 'supervisor_pas' })
  supervisor_pas: Supervisor;

  @Column({ type: 'date' })
  inicio_pas: Date;

  @Column({ type: 'date', nullable: true })
  fin_pas: Date;

  @Column({
    type: 'enum',
    enum: EstadoPasantia,
    default: EstadoPasantia.PENDIENTE
  })
  estado_pas: EstadoPasantia;

  @CreateDateColumn({ type: 'timestamp' })
  creacion_pas: Date;

  constructor() {
    this.id_pas = 0;
    this.estudiante_pas = new Estudiante();
    this.centro_pas = new CentroDeTrabajo();
    this.supervisor_pas = new Supervisor();
    this.inicio_pas = new Date();
    this.fin_pas = new Date();
    this.estado_pas = EstadoPasantia.PENDIENTE;
    this.creacion_pas = new Date();
  }
}