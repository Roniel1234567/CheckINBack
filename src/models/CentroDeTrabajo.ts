import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Direccion } from './Direccion';
import { Contacto } from './Contacto';
import { Usuario } from './User';
import { PersonaContactoEmpresa } from './PersonaContactoEmpresa';

export type EstadoCentroType = 'Activo' | 'Inactivo';
export type TipoValidacion = 'Aceptada' | 'Rechazada' | 'Pendiente';

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

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'id_usu', referencedColumnName: 'id_usuario' })
  usuario?: Usuario;

  @OneToMany(() => PersonaContactoEmpresa, (pce) => pce.centro_trabajo)
  persona_contacto_empresa!: PersonaContactoEmpresa[];

  @Column({
    type: 'enum',
    enum: ['Activo', 'Inactivo'],
    default: 'Activo'
  })
  estado_centro!: EstadoCentroType;

  @Column({
    type: 'enum',
    enum: ['Aceptada', 'Rechazada', 'Pendiente'],
    default: 'Pendiente',
    nullable: false
  })
  validacion!: TipoValidacion;

  @CreateDateColumn({ name: 'creacion_centro' })
  creacion_centro!: Date;

  constructor() {
    this.estado_centro = 'Activo';
    this.creacion_centro = new Date();
  }
}