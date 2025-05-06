import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('contacto')
export class Contacto {
  @PrimaryGeneratedColumn()
  id_contacto: number;

  @Column({ type: 'char', length: 12 })
  telefono_contacto: string;

  @Column({ type: 'varchar', length: 255 })
  email_contacto: string;

  @Column({ type: 'varchar', default: 'Activo' })
  estado_contacto: string;

  @CreateDateColumn({ type: 'timestamp' })
  creacion_contacto: Date;

  constructor() {
    this.id_contacto = 0;
    this.telefono_contacto = '';
    this.email_contacto = '';
    this.estado_contacto = 'Activo';
    this.creacion_contacto = new Date();
  }
}