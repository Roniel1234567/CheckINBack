import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('contacto')
export class Contacto {
  @PrimaryGeneratedColumn({ name: 'id_contacto' })
  id_contacto!: number;

  @Column({ type: 'varchar', length: 50, name: 'telefono_contacto' })
  telefono_contacto!: string;

  @Column({ type: 'varchar', length: 100, name: 'email_contacto' })
  email_contacto!: string;

  @Column({ type: 'varchar', default: 'Activo' })
  estado_contacto: string;

  @CreateDateColumn({ type: 'timestamp' })
  creacion_contacto: Date;

  constructor() {
    this.estado_contacto = 'Activo';
    this.creacion_contacto = new Date();
  }
}