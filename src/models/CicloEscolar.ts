import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('ciclo_escolar')
export class CicloEscolar {
  @PrimaryGeneratedColumn()
  id_ciclo: number;

  @Column({ type: 'int' })
  inicio_ciclo: number;

  @Column({ type: 'int' })
  fin_ciclo: number;

  @Column({ type: 'varchar' })
  estado_ciclo: string;

  @CreateDateColumn({ type: 'timestamp' })
  creacion_ciclo: Date;

  constructor() {
    this.id_ciclo = 0;
    this.inicio_ciclo = 0;
    this.fin_ciclo = 0;
    this.estado_ciclo = '';
    this.creacion_ciclo = new Date();
  }
}