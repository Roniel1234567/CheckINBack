import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pasantia } from './Pasantia';

// Enum para los días de la semana
export enum DiaSemana {
  LUNES = 'Lunes',
  MARTES = 'Martes',
  MIERCOLES = 'Miércoles',
  JUEVES = 'Jueves',
  VIERNES = 'Viernes',
  SABADO = 'Sábado',
  DOMINGO = 'Domingo'
}

@Entity('dias_pasantia')
export class DiasPasantia {
    @PrimaryGeneratedColumn()
    id_diapas!: number;

    @ManyToOne(() => Pasantia, { nullable: true })
    @JoinColumn({ name: 'id_pas' })
    pasantia?: Pasantia;

    @Column({
      type: 'enum',
      enum: DiaSemana,
      nullable: true
    })
    dia_semana?: DiaSemana;

    constructor(pasantia?: Pasantia, dia_semana?: DiaSemana) {
        if (pasantia) this.pasantia = pasantia;
        if (dia_semana) this.dia_semana = dia_semana;
    }
}

export default DiasPasantia;