import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Contacto } from './Contacto';
import { CentroDeTrabajo } from './CentroDeTrabajo';

export type EstadoSupervisorType = 'Activo' | 'Inactivo';

@Entity('supervisor')
export class Supervisor {
  @PrimaryGeneratedColumn()
  id_sup!: number;

  @Column({ type: 'varchar', length: 100 })
  nombre_sup!: string;

  @Column({ type: 'varchar', length: 100 })
  apellido_sup!: string;

  @ManyToOne(() => Contacto, { nullable: false })
  @JoinColumn({ name: 'contacto_sup' })
  contacto_sup!: Contacto;

  @ManyToOne(() => CentroDeTrabajo, { nullable: true })
  @JoinColumn({ name: 'id_centro' })
  centro_trabajo?: CentroDeTrabajo;

  @Column({
    type: 'enum',
    enum: ['Activo', 'Inactivo'],
    default: 'Activo'
  })
  estado_sup!: EstadoSupervisorType;

  @CreateDateColumn({ name: 'creacion_sup' })
  creacion_sup!: Date;

  constructor() {
    this.estado_sup = 'Activo';
    this.creacion_sup = new Date();
  }
}