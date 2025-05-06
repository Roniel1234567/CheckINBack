import { Entity, Column, CreateDateColumn } from 'typeorm';

@Entity('actividad_reciente')
export class ActividadReciente {
  @Column({ type: 'varchar', length: 50 })
  usuario_act: string;

  @Column({ type: 'varchar', length: 50 })
  actividad: string;

  @Column({ type: 'varchar', length: 50 })
  entidad_act: string;

  @CreateDateColumn({ type: 'timestamp' })
  registro_act: Date;

  constructor() {
    this.usuario_act = '';
    this.actividad = '';
    this.entidad_act = '';
    this.registro_act = new Date();
  }
}