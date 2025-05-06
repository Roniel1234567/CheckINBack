import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { CentroDeTrabajo } from './CentroDeTrabajo';
import { Taller } from './Taller';

@Entity('plazas_centro')
export class PlazasCentro {
    @PrimaryGeneratedColumn()
    id_plaza!: number;

    @ManyToOne(() => CentroDeTrabajo, { nullable: false })
    @JoinColumn({ name: 'centro_plaza' })
    centro_plaza!: CentroDeTrabajo;

    @ManyToOne(() => Taller, { nullable: false })
    @JoinColumn({ name: 'taller_plaza' })
    taller_plaza!: Taller;

    @Column({ type: 'integer', nullable: false })
    plazas_centro!: number;

    @Column({ type: 'integer', default: 0, nullable: false })
    plazas_ocupadas!: number;

    @CreateDateColumn({ name: 'creacion_plaza' })
    creacion_plaza!: Date;

    constructor() {
        this.plazas_centro = 0;
        this.plazas_ocupadas = 0;
        this.creacion_plaza = new Date();
    }
}

export default PlazasCentro;