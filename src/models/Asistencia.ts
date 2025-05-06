import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('asistencia_pasantia')
export class AsistenciaPasantia {
    @PrimaryGeneratedColumn()
    id_asis!: number;

    @Column()
    @JoinColumn({ name: 'pasantia_asis' })
    pasantia_asis!: number;

    @Column({ type: 'date' })
    fecha_asis!: Date;

    @Column({ type: 'time', nullable: true })
    entrada_asis!: Date;

    @Column({ type: 'time', nullable: true })
    salida_asis!: Date;

    @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
    horas_realizadas!: number;

    @Column({ type: 'boolean', default: true })
    asistencia!: boolean;

    @Column({ nullable: true })
    @JoinColumn({ name: 'excusa_asis' })
    excusa_asis!: number;

    constructor(
        pasantia_asis: number = 0,
        fecha_asis: Date = new Date(),
        entrada_asis: Date = new Date(),
        salida_asis: Date = new Date(),
        horas_realizadas: number = 0,
        asistencia: boolean = true,
        excusa_asis: number = 0
    ) {
        this.pasantia_asis = pasantia_asis;
        this.fecha_asis = fecha_asis;
        this.entrada_asis = entrada_asis;
        this.salida_asis = salida_asis;
        this.horas_realizadas = horas_realizadas;
        this.asistencia = asistencia;
        this.excusa_asis = excusa_asis;
    }
}