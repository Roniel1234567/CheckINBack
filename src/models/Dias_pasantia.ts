import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Pasantia } from './Pasantia'; // Asegúrate de que esta entidad exista

@Entity('Dias_pasantia')
export class DiasPasantia {
    @PrimaryGeneratedColumn()
    id_diapas!: number;

    @ManyToOne(() => Pasantia, { nullable: false })
    @JoinColumn({ name: 'Dias_pasantia' })
    pasantia_diapas!: Pasantia;

    @Column({ type: 'int', nullable: false })
    dia_semana!: number;

    @CreateDateColumn({ name: 'Dias_pasantia' })
    creacion_diapas!: Date;

    constructor(pasantia_diapas: Pasantia, dia_semana: number) {
        this.pasantia_diapas = pasantia_diapas;
        this.dia_semana = dia_semana;
        this.creacion_diapas = new Date();
    }
}

export default DiasPasantia;