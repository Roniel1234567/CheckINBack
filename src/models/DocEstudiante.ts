import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Estudiante } from './Estudiante';

@Entity('doc_estudiante')
export class DocEstudiante {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  est_doc: string;

  @Column({ type: 'varchar', default: 'Pendiente' })
  id_doc: string;

  @Column({ type: 'varchar', default: 'Pendiente' })
  cv_doc: string;

  @Column({ type: 'varchar', default: 'Pendiente' })
  anexo_iv_doc: string;

  @Column({ type: 'varchar', default: 'Pendiente' })
  anexo_v_doc: string;

  @Column({ type: 'varchar', default: 'Pendiente' })
  acta_nac_doc: string;

  @Column({ type: 'varchar', default: 'Pendiente' })
  ced_padres_doc: string;

  @Column({ type: 'varchar', default: 'Pendiente' })
  vac_covid_doc: string;

  @Column({ type: 'bytea', nullable: true })
  id_doc_file?: Buffer;

  @Column({ type: 'bytea', nullable: true })
  cv_doc_file?: Buffer;

  @Column({ type: 'bytea', nullable: true })
  anexo_iv_doc_file?: Buffer;

  @Column({ type: 'bytea', nullable: true })
  anexo_v_doc_file?: Buffer;

  @Column({ type: 'bytea', nullable: true })
  acta_nac_doc_file?: Buffer;

  @Column({ type: 'bytea', nullable: true })
  ced_padres_doc_file?: Buffer;

  @Column({ type: 'bytea', nullable: true })
  vac_covid_doc_file?: Buffer;

  @ManyToOne(() => Estudiante)
  @JoinColumn({ name: 'est_doc' })
  estudiante: Estudiante;

  constructor() {
    this.est_doc = '';
    this.id_doc = 'Pendiente';
    this.cv_doc = 'Pendiente';
    this.anexo_iv_doc = 'Pendiente';
    this.anexo_v_doc = 'Pendiente';
    this.acta_nac_doc = 'Pendiente';
    this.ced_padres_doc = 'Pendiente';
    this.vac_covid_doc = 'Pendiente';
    this.estudiante = new Estudiante();
  }
}