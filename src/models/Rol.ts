import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rol')
export class Rol {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  rol: string;

  @Column({ type: 'varchar', default: 'Activo' })
  estado_rol: string;

  constructor() {
    this.id_rol = 0;
    this.rol = '';
    this.estado_rol = 'Activo';
  }
}