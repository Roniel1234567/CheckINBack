import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Estudiante } from './Estudiante';
import { CentroDeTrabajo } from './CentroDeTrabajo';
import { Supervisor } from './Supervisor';

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

  @Column({ type: 'int', default: () => 'horaspasxtaller()' })
  horas_pas: number;

  @Column({ type: 'date' })
  inicio_pas: Date;

  @Column({ type: 'date', nullable: true })
  fin_pas: Date;

  @Column({ type: 'varchar', default: 'Pendiente' })
  estado_pas: string;

  @CreateDateColumn({ type: 'timestamp' })
  creacion_pas: Date;

  constructor() {
    this.id_pas = 0;
    this.estudiante_pas = new Estudiante();
    this.centro_pas = new CentroDeTrabajo();
    this.supervisor_pas = new Supervisor();
    this.horas_pas = 0;
    this.inicio_pas = new Date();
    this.fin_pas = new Date();
    this.estado_pas = 'Pendiente';
    this.creacion_pas = new Date();
  }
}