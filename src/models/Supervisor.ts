import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Contacto } from './Contacto';

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

  @CreateDateColumn({ name: 'creacion_sup' })
  creacion_sup!: Date;

  constructor() {
    this.creacion_sup = new Date();
  }
}