import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Estudiante } from './Estudiante';

@Entity('persona_contacto_estudiante')
export class PersonaContactoEstudiante {
    @PrimaryGeneratedColumn({ name: 'id_contacto_estudiante' })
    id_contacto_estudiante!: number;

    @Column({ type: 'varchar', length: 100, name: 'nombre' })
    nombre!: string;

    @Column({ type: 'varchar', length: 100, name: 'apellido' })
    apellido!: string;

    @Column({ type: 'varchar', length: 50, name: 'relacion' })
    relacion!: 'Padre' | 'Madre' | 'Tutor';

    @Column({ type: 'varchar', length: 20, name: 'telefono' })
    telefono!: string;

    @Column({ type: 'varchar', length: 150, name: 'correo', nullable: true })
    correo?: string;

    @ManyToOne(() => Estudiante, { nullable: false })
    @JoinColumn({ name: 'estudiante_id', referencedColumnName: 'documento_id_est' })
    estudiante!: Estudiante;
} 