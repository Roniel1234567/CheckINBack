import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Estudiante } from './Estudiante';

export enum EstadoDocumento {
    VISTO = 'Visto',
    APROBADO = 'Aprobado',
    RECHAZADO = 'Rechazado',
    PENDIENTE = 'Pendiente'
}

@Entity('doc_estudiante')
export class DocEstudiante {
  @PrimaryColumn({ name: 'est_doc', type: 'varchar', length: 20 })
  est_doc!: string;

  @ManyToOne(() => Estudiante, { nullable: false })
  @JoinColumn({ name: 'est_doc', referencedColumnName: 'documento_id_est' })
  estudiante!: Estudiante;

  @Column({ type: 'bytea', name: 'ced_est', nullable: true })
  ced_est?: Buffer;

  @Column({ type: 'bytea', name: 'cv_doc', nullable: true })
  cv_doc?: Buffer;

  @Column({ type: 'bytea', name: 'anexo_iv_doc', nullable: true })
  anexo_iv_doc?: Buffer;

  @Column({ type: 'bytea', name: 'anexo_v_doc', nullable: true })
  anexo_v_doc?: Buffer;

  @Column({ type: 'bytea', name: 'acta_nac_doc', nullable: true })
  acta_nac_doc?: Buffer;

  @Column({ type: 'bytea', name: 'ced_padres_doc', nullable: true })
  ced_padres_doc?: Buffer;

  @Column({ type: 'bytea', name: 'vac_covid_doc', nullable: true })
  vac_covid_doc?: Buffer;

  @Column({ 
    type: 'enum',
    enum: EstadoDocumento,
    name: 'estado_doc_est',
    default: EstadoDocumento.PENDIENTE
  })
  estado_doc_est!: EstadoDocumento;
}