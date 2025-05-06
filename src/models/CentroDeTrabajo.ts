import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Direccion } from './Direccion';
import { Contacto } from './Contacto';

export type EstadoCentroType = 'Activo' | 'Inactivo';

@Entity('centro_trabajo')
export class CentroDeTrabajo {
  @PrimaryGeneratedColumn()
  id_centro!: number;

  @Column({ type: 'varchar', length: 100 })
  nombre_centro!: string;

  @ManyToOne(() => Direccion, { nullable: false })
  @JoinColumn({ name: 'direccion_centro' })
  direccion_centro!: Direccion;

  @ManyToOne(() => Contacto, { nullable: false })
  @JoinColumn({ name: 'contacto_centro' })
  contacto_centro!: Contacto;

  @Column({
    type: 'enum',
    enum: ['Activo', 'Inactivo'],
    default: 'Activo'
  })
  estado_centro!: EstadoCentroType;

  @CreateDateColumn({ name: 'creacion_centro' })
  creacion_centro!: Date;

  constructor() {
    this.estado_centro = 'Activo';
    this.creacion_centro = new Date();
  }
}