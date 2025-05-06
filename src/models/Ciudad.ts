import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Provincia } from './Provincia';

@Entity('ciudad')
export class Ciudad {
    @PrimaryGeneratedColumn({ name: 'id_ciu' })
    id_ciu!: number;

    @Column({ type: 'varchar', length: 100 })
    ciudad!: string;

    @Column({ name: 'provincia_ciu' })
    provincia_ciu!: number;

    @ManyToOne(() => Provincia, (provincia) => provincia.ciudades)
    @JoinColumn({ name: 'provincia_ciu' })
    provincia!: Provincia;
}