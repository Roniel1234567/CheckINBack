import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from './User';
import { Contacto } from './Contacto';

@Entity('supervisor')
export class Supervisor {
  @PrimaryGeneratedColumn()
  id_sup!: number;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuario_sup' })
  usuario_sup!: Usuario;

  @Column({ type: 'varchar', length: 100 })
  nombre_sup!: string;

  @Column({ type: 'varchar', length: 100 })
  apellido_sup!: string;

  @ManyToOne(() => Contacto, { nullable: false })
  @JoinColumn({ name: 'contacto_sup' })
  contacto_sup!: Contacto;

  @CreateDateColumn({ name: 'creacion_usu' })
  creacion_usu!: Date;

  constructor() {
    this.creacion_usu = new Date();
  }
}