import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Rol } from './Rol';

export type EstadoUsuarioType = 'Activo' | 'Inactivo' | 'Eliminado';

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn({ name: 'id_usu' })
    id_usuario!: number;

    @Column({ type: 'varchar', length: 25, unique: true, name: 'usuario' })
    dato_usuario!: string;

    @Column({ type: 'text', name: 'contrasena_usu' })
    contrasena_usuario!: string;

    @Column({ type: 'integer', name: 'rol_usu' })
    rol_usuario!: number;

    @Column({
        type: 'enum',
        enum: ['Activo', 'Inactivo', 'Eliminado'],
        default: 'Activo',
        name: 'estado_usu'
    })
    estado_usuario!: EstadoUsuarioType;

    @Column({ 
        type: 'timestamp', 
        name: 'creacion_usu',
        default: () => 'CURRENT_TIMESTAMP'
    })
    creacion_usuario!: Date;

    @ManyToOne(() => Rol)
    @JoinColumn({ name: 'rol_usu' })
    rol?: Rol;
}