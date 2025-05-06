import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ciudad } from './Ciudad';

@Entity('provincia')
export class Provincia {
    @PrimaryGeneratedColumn({ name: 'id_prov' })
    id_prov!: number;

    @Column({ type: 'varchar', length: 100 })
    provincia!: string;

    @OneToMany(() => Ciudad, (ciudad) => ciudad.provincia)
    ciudades?: Ciudad[];
}