import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Pasantia, EstadoPasantia } from '../models/Pasantia';

const pasantiaRepository = AppDataSource.getRepository(Pasantia);

export const getAllPasantias = async (req: Request, res: Response) => {
    try {
        const pasantias = await pasantiaRepository
            .createQueryBuilder('pasantia')
            .innerJoinAndSelect('pasantia.estudiante_pas', 'estudiante')
            .innerJoinAndSelect('pasantia.centro_pas', 'centro')
            .innerJoin('pasantia.supervisor_pas', 'supervisor')
            .addSelect([
                'supervisor.id_sup',
                'supervisor.nombre_sup',
                'supervisor.apellido_sup',
                'supervisor.creacion_sup',
                'supervisor.contacto_sup'
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
            .innerJoinAndSelect('pasantia.centro_pas', 'centro')
            .innerJoin('pasantia.supervisor_pas', 'supervisor')
            .addSelect([
                'supervisor.id_sup',
                'supervisor.nombre_sup',
                'supervisor.apellido_sup',
                'supervisor.creacion_sup',
                'supervisor.contacto_sup'
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
            .innerJoinAndSelect('pasantia.centro_pas', 'centro')
            .innerJoin('pasantia.supervisor_pas', 'supervisor')
            .addSelect([
                'supervisor.id_sup',
                'supervisor.nombre_sup',
                'supervisor.apellido_sup',
                'supervisor.creacion_sup',
                'supervisor.contacto_sup'
            ])
            .where('pasantia.estado_pas = :estado', { estado: EstadoPasantia.EN_PROCESO })
            .orWhere('pasantia.estado_pas = :estado2', { estado2: EstadoPasantia.TERMINADA })
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
        const newPasantia = pasantiaRepository.create(req.body);
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
        
        pasantiaRepository.merge(pasantia, req.body);
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