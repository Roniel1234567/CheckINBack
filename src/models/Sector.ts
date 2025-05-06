import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ciudad } from './Ciudad';

@Entity('sector')
export class Sector {
    @PrimaryGeneratedColumn({ name: 'id_sec' })
    id_sec!: number;

    @Column({ type: 'varchar', length: 100 })
    sector!: string;

    @Column({ name: 'ciudad_sec' })
    ciudad_sec!: number;

    @ManyToOne(() => Ciudad)
    @JoinColumn({ name: 'ciudad_sec' })
    ciudad!: Ciudad;
}