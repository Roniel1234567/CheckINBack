import { Entity, PrimaryColumn, Column } from 'typeorm';

export type DatoEstadoType = 'Activo' | 'Inactivo' | 'Eliminado';

@Entity('familia_profesional')
export class FamiliaProfesional {
  @PrimaryColumn({ type: 'char', length: 3 })
  id_fam!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre_fam!: string;

  @Column({
    type: 'enum',
    enum: ['Activo', 'Inactivo', 'Eliminado'],
    default: 'Activo',
    nullable: false
  })
  estado_fam!: DatoEstadoType;

  constructor(
    id_fam: string = '', 
    nombre_fam: string = '', 
    estado_fam: DatoEstadoType = 'Activo'
  ) {
    this.id_fam = id_fam;
    this.nombre_fam = nombre_fam;
    this.estado_fam = estado_fam;
  }
}

export default FamiliaProfesional;
