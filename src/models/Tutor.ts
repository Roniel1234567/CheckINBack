import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Taller } from './Taller';
import { Usuario } from './User';
import { Contacto } from './Contacto';

@Entity('tutor')
export class Tutor {
    @PrimaryGeneratedColumn()
    id_tutor!: number;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_tutor' })
    usuario_tutor!: number;

    @Column({ type: 'varchar', length: 100 })
    nombre_tutor!: string;

    @Column({ type: 'varchar', length: 100 })
    apellido_tutor!: string;

    @ManyToOne(() => Taller)
    @JoinColumn({ name: 'taller_tutor' })
    taller_tutor!: number;

    @ManyToOne(() => Contacto)
    @JoinColumn({ name: 'contacto_tutor' })
    contacto_tutor!: number;

    @CreateDateColumn({ name: 'creacion_tutor' })
    creacion_tutor!: Date;

    constructor(
        usuario_tutor: number = 0,
        nombre_tutor: string = '',
        apellido_tutor: string = '',
        taller_tutor: number = 0,
        contacto_tutor: number = 0
    ) {
        this.usuario_tutor = usuario_tutor;
        this.nombre_tutor = nombre_tutor;
        this.apellido_tutor = apellido_tutor;
        this.taller_tutor = taller_tutor;
        this.contacto_tutor = contacto_tutor;
        this.creacion_tutor = new Date();
    }
}