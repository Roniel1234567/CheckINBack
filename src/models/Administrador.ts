import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from './User';
import { Contacto } from './Contacto';

@Entity('administrador')
export class Administrador {
    @PrimaryGeneratedColumn({ name: 'id_adm' })
    id_adm!: number;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_adm' })
    usuario_adm!: Usuario;

    @Column({ type: 'varchar', length: 100, name: 'nombre_adm' })
    nombre_adm!: string;

    @Column({ type: 'varchar', length: 100, name: 'apellido_adm' })
    apellido_adm!: string;

    @Column({ type: 'varchar', length: 50, name: 'puesto_adm' })
    puesto_adm!: string;

    @ManyToOne(() => Contacto)
    @JoinColumn({ name: 'contacto_adm' })
    contacto_adm!: Contacto;

    @CreateDateColumn({ name: 'creacion_adm' })
    creacion_adm!: Date;

    constructor() {
        this.creacion_adm = new Date();
    }
} 