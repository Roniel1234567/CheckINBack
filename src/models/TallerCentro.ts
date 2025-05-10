import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Taller } from './Taller';
import { CentroDeTrabajo } from './CentroDeTrabajo';

@Entity('taller_centro')
export class TallerCentro {
  @PrimaryColumn()
  id_taller!: number;

  @PrimaryColumn()
  id_centro!: number;

  @ManyToOne(() => Taller, { eager: true })
  @JoinColumn({ name: 'id_taller' })
  taller!: Taller;

  @ManyToOne(() => CentroDeTrabajo, { eager: true })
  @JoinColumn({ name: 'id_centro' })
  centro!: CentroDeTrabajo;
}