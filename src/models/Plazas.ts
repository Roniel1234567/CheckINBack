import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { CentroDeTrabajo } from './CentroDeTrabajo';
import { Taller } from './Taller';

export type EstadoPlaza = 'Activa' | 'Inactiva';
export type GeneroPermitido = 'Masculino' | 'Femenino' | 'Ambos';

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

    @CreateDateColumn({ name: 'creacion_plaza' })
    creacion_plaza!: Date;

    @Column({
        type: 'enum',
        enum: ['Activa', 'Inactiva'],
        default: 'Activa',
        nullable: false
    })
    estado!: EstadoPlaza;

    @Column({ type: 'integer', nullable: true })
    edad_minima?: number;

    @Column({
        type: 'enum',
        enum: ['Masculino', 'Femenino', 'Ambos'],
        default: 'Ambos',
        nullable: false
    })
    genero!: GeneroPermitido;

    @Column({ type: 'text', nullable: true })
    observacion?: string;

    constructor() {
        this.plazas_centro = 0;
        this.creacion_plaza = new Date();
    }
}

export default PlazasCentro;