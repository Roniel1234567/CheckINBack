import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from './User';
import { Contacto } from './Contacto';
import { Taller } from './Taller';
import { Direccion } from './Direccion';
import { CicloEscolar } from './CicloEscolar';
import { FamiliaProfesional } from './familia_profecional'; // Ajusta la ruta según corresponda

@Entity('estudiante')
export class Estudiante {
  @Column({ type: 'varchar', default: 'Cédula' })
  tipo_documento_est: string;

  @PrimaryColumn({ type: 'varchar', length: 20 })
  documento_id_est: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_est' })
  usuario_est: Usuario;

  @Column({ type: 'varchar', length: 100 })
  nombre_est: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  seg_nombre_est?: string;

  @Column({ type: 'varchar', length: 100 })
  apellido_est: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  seg_apellido_est?: string;

  @Column({ type: 'date' })
  fecha_nac_est: Date;

  @ManyToOne(() => Contacto)
  @JoinColumn({ name: 'contacto_est' })
  contacto_est: Contacto;

  @ManyToOne(() => Taller)
  @JoinColumn({ name: 'taller_est' })
  taller_est: Taller;

  @ManyToOne(() => Direccion)
  @JoinColumn({ name: 'direccion_id' })
  direccion_id: Direccion;

  @ManyToOne(() => CicloEscolar)
  @JoinColumn({ name: 'ciclo_escolar_est' })
  ciclo_escolar_est: CicloEscolar;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  horaspasrealizadas_est?: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  nombre_poliza?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  numero_poliza?: string;

  @Column({ type: 'date', nullable: true })
  fecha_inicio_pasantia?: Date;

  @Column({ type: 'date', nullable: true })
  fecha_fin_pasantia?: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nacionalidad?: string;

  @CreateDateColumn({ type: 'timestamp' })
  creacion_est: Date;

  constructor() {
    this.tipo_documento_est = 'Cédula';
    this.documento_id_est = '';
    this.usuario_est = new Usuario();
    this.nombre_est = '';
    this.seg_nombre_est = '';
    this.apellido_est = '';
    this.seg_apellido_est = '';
    this.fecha_nac_est = new Date();
    this.contacto_est = new Contacto();
    this.direccion_id = new Direccion();
    this.ciclo_escolar_est = new CicloEscolar();
    this.creacion_est = new Date();
    this.taller_est = new Taller('', '', new FamiliaProfesional());
    
    // Inicialización de campos de pasantía y póliza
    this.horaspasrealizadas_est = 0;
    this.nombre_poliza = '';
    this.numero_poliza = '';
    this.fecha_inicio_pasantia = undefined;
    this.fecha_fin_pasantia = undefined;
  }
}
