import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Sector } from './Sector';

@Entity('direccion')
export class Direccion {
  @PrimaryGeneratedColumn()
  id_dir: number;

  @ManyToOne(() => Sector)
  @JoinColumn({ name: 'sector_dir' })
  sector_dir: Sector;

  @Column({ type: 'varchar', length: 100 })
  calle_dir: string;

  @Column({ type: 'varchar', length: 20 })
  num_res_dir: string;

  @Column({ type: 'varchar', default: 'Activo' })
  estado_dir: string;

  @CreateDateColumn({ type: 'timestamp' })
  creacion_dir: Date;

  constructor() {
    this.id_dir = 0;
    this.sector_dir = new Sector();
    this.calle_dir = '';
    this.num_res_dir = '';
    this.estado_dir = 'Activo';
    this.creacion_dir = new Date();
  }
}