import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CentroDeTrabajo } from './CentroDeTrabajo';

@Entity('persona_contacto_empresa')
export class PersonaContactoEmpresa {
    @PrimaryGeneratedColumn({ name: 'id_persona_contacto' })
    id_persona_contacto!: number;

    @Column({ type: 'varchar', length: 100, name: 'nombre_persona_contacto' })
    nombre_persona_contacto!: string;

    @Column({ type: 'varchar', length: 100, name: 'apellido_persona_contacto' })
    apellido_persona_contacto!: string;

    @Column({ type: 'varchar', length: 20, name: 'telefono' })
    telefono!: string;

    @Column({ type: 'varchar', length: 10, name: 'extension', nullable: true })
    extension?: string;

    @Column({ type: 'varchar', length: 100, name: 'departamento', nullable: true })
    departamento?: string;

    @ManyToOne(() => CentroDeTrabajo, { nullable: false })
    @JoinColumn({ name: 'centro_trabajo_id', referencedColumnName: 'id_centro' })
    centro_trabajo!: CentroDeTrabajo;
} 