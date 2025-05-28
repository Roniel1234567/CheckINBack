import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Pasantia, EstadoPasantia } from '../models/Pasantia';
import { PlazasCentro } from '../models/Plazas';

const pasantiaRepository = AppDataSource.getRepository(Pasantia);

export const getAllPasantias = async (req: Request, res: Response) => {
    try {
        const pasantias = await pasantiaRepository
            .createQueryBuilder('pasantia')
            .innerJoinAndSelect('pasantia.estudiante_pas', 'estudiante')
            .innerJoinAndSelect('estudiante.usuario_est', 'usuario_est')
            .innerJoinAndSelect('pasantia.centro_pas', 'centro')
            .innerJoin('pasantia.supervisor_pas', 'supervisor')
            .leftJoinAndSelect('pasantia.plaza_pas', 'plaza_pas')
            .addSelect([
                'supervisor.id_sup',
                'supervisor.nombre_sup',
                'supervisor.apellido_sup',
                'supervisor.creacion_sup',
                'supervisor.contacto_sup',
                'usuario_est.id_usuario',
                'usuario_est.estado_usuario'
            ])
            .getMany();

        return res.json(pasantias);
    } catch (error) {
        console.error('Error al obtener las pasantías:', error);
        return res.status(500).json({ message: 'Error al obtener las pasantías' });
    }
};

export const getPasantiaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const pasantia = await pasantiaRepository
            .createQueryBuilder('pasantia')
            .innerJoinAndSelect('pasantia.estudiante_pas', 'estudiante')
            .innerJoinAndSelect('estudiante.usuario_est', 'usuario_est')
            .innerJoinAndSelect('pasantia.centro_pas', 'centro')
            .innerJoin('pasantia.supervisor_pas', 'supervisor')
            .leftJoinAndSelect('pasantia.plaza_pas', 'plaza_pas')
            .addSelect([
                'supervisor.id_sup',
                'supervisor.nombre_sup',
                'supervisor.apellido_sup',
                'supervisor.creacion_sup',
                'supervisor.contacto_sup',
                'usuario_est.id_usuario',
                'usuario_est.estado_usuario'
            ])
            .where('pasantia.id_pas = :id', { id: parseInt(id) })
            .getOne();
        
        if (!pasantia) return res.status(404).json({ message: 'Pasantía no encontrada' });
        return res.json(pasantia);
    } catch (error) {
        console.error('Error al obtener la pasantía:', error);
        return res.status(500).json({ message: 'Error al obtener la pasantía' });
    }
};

export const getPasantiasPendientesEvaluacion = async (req: Request, res: Response) => {
    try {
        console.log('Buscando pasantías con estados:', EstadoPasantia.EN_PROCESO, EstadoPasantia.TERMINADA);

        const pasantias = await pasantiaRepository
            .createQueryBuilder('pasantia')
            .innerJoinAndSelect('pasantia.estudiante_pas', 'estudiante')
            .innerJoinAndSelect('estudiante.usuario_est', 'usuario_est')
            .innerJoinAndSelect('pasantia.centro_pas', 'centro')
            .innerJoin('pasantia.supervisor_pas', 'supervisor')
            .leftJoinAndSelect('pasantia.plaza_pas', 'plaza_pas')
            .addSelect([
                'supervisor.id_sup',
                'supervisor.nombre_sup',
                'supervisor.apellido_sup',
                'supervisor.creacion_sup',
                'supervisor.contacto_sup',
                'usuario_est.id_usuario',
                'usuario_est.estado_usuario'
            ])
            .where('(pasantia.estado_pas = :enProceso OR pasantia.estado_pas = :terminada)', {
                enProceso: EstadoPasantia.EN_PROCESO,
                terminada: EstadoPasantia.TERMINADA
            })
            .getMany();
            
        console.log('Pasantías encontradas:', pasantias.length);
        return res.json(pasantias);
    } catch (error: any) {
        console.error('Error al obtener pasantías para evaluación:', error);
        return res.status(500).json({ message: 'Error al obtener las pasantías', error: error.message });
    }
};

export const createPasantia = async (req: Request, res: Response) => {
    try {
        let body = req.body;

        if (body.plaza_pas && typeof body.plaza_pas === 'number') {
            body.plaza_pas = await AppDataSource.getRepository(PlazasCentro).findOneBy({ id_plaza: body.plaza_pas });
        }
        const newPasantia = pasantiaRepository.create(body);
        await pasantiaRepository.save(newPasantia);
        return res.status(201).json(newPasantia);
    } catch (error) {
        console.error('Error al crear la pasantía:', error);
        return res.status(500).json({ message: 'Error al crear la pasantía' });
    }
};

export const updatePasantia = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const pasantia = await pasantiaRepository.findOneBy({ id_pas: parseInt(id) });
        if (!pasantia) return res.status(404).json({ message: 'Pasantía no encontrada' });
        
        let body = req.body;

        if (body.plaza_pas && typeof body.plaza_pas === 'number') {
            body.plaza_pas = await AppDataSource.getRepository(PlazasCentro).findOneBy({ id_plaza: body.plaza_pas });
        }
        pasantiaRepository.merge(pasantia, body);
        await pasantiaRepository.save(pasantia);
        return res.json(pasantia);
    } catch (error) {
        console.error('Error al actualizar la pasantía:', error);
        return res.status(500).json({ message: 'Error al actualizar la pasantía' });
    }
};

export const deletePasantia = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pasantiaRepository.delete({ id_pas: parseInt(id) });
        if (result.affected === 0) return res.status(404).json({ message: 'Pasantía no encontrada' });
        return res.status(204).json();
    } catch (error) {
        console.error('Error al eliminar la pasantía:', error);
        return res.status(500).json({ message: 'Error al eliminar la pasantía' });
    }
};

export const getPasantiaByEstudianteId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const pasantia = await pasantiaRepository
            .createQueryBuilder('pasantia')
            .innerJoinAndSelect('pasantia.estudiante_pas', 'estudiante')
            .innerJoinAndSelect('estudiante.usuario_est', 'usuario_est')
            .innerJoinAndSelect('pasantia.centro_pas', 'centro')
            .innerJoin('pasantia.supervisor_pas', 'supervisor')
            .leftJoinAndSelect('pasantia.plaza_pas', 'plaza_pas')
            .addSelect([
                'supervisor.id_sup',
                'supervisor.nombre_sup',
                'supervisor.apellido_sup',
                'supervisor.creacion_sup',
                'supervisor.contacto_sup',
                'usuario_est.id_usuario',
                'usuario_est.estado_usuario'
            ])
            .where('estudiante.documento_id_est = :id', { id })
            .andWhere('pasantia.estado_pas != :estado', { estado: EstadoPasantia.CANCELADA })
            .getOne();
        
        if (!pasantia) return res.status(404).json({ message: 'Pasantía no encontrada para este estudiante' });
        return res.json(pasantia);
    } catch (error) {
        console.error('Error al obtener la pasantía del estudiante:', error);
        return res.status(500).json({ message: 'Error al obtener la pasantía del estudiante' });
    }
};