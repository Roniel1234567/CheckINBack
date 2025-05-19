import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Poliza {
    @PrimaryGeneratedColumn()
    id_poliza!: number;

    @Column({ length: 150 })
    compania!: string;

    @Column({ length: 100 })
    tipo_poliza!: string;

    @Column({ length: 150 })
    nombre_poliza!: string;

    @Column({ length: 50 })
    numero_poliza!: string;

    @Column({ type: 'date' })
    fecha_inicio!: string;

    @Column({ type: 'date', nullable: true })
    fecha_fin!: string | null;
} 