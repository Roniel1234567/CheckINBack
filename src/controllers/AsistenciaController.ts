import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { AsistenciaPasantia } from '../models/Asistencia';

const asistenciaRepository = AppDataSource.getRepository(AsistenciaPasantia);

export const getAllAsistencias = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const asistencias = await asistenciaRepository.find({
            relations: ['pasantia_asis', 'excusa_asis']
        });
        return res.status(200).json(asistencias);
    } catch (error) {
        console.error('Error al obtener asistencias:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getAsistenciaById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const asistencia = await asistenciaRepository.findOne({
            where: { id_asis: id },
            relations: ['pasantia_asis', 'excusa_asis']
        });

        if (!asistencia) {
            return res.status(404).json({ message: 'Asistencia no encontrada' });
        }

        return res.status(200).json(asistencia);
    } catch (error) {
        console.error('Error al obtener asistencia:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createAsistencia = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newAsistencia = asistenciaRepository.create(req.body);
        const savedAsistencia = await asistenciaRepository.save(newAsistencia);
        return res.status(201).json(savedAsistencia);
    } catch (error) {
        console.error('Error al crear asistencia:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateAsistencia = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const asistencia = await asistenciaRepository.findOne({
            where: { id_asis: id }
        });

        if (!asistencia) {
            return res.status(404).json({ message: 'Asistencia no encontrada' });
        }

        asistenciaRepository.merge(asistencia, req.body);
        const updatedAsistencia = await asistenciaRepository.save(asistencia);
        return res.status(200).json(updatedAsistencia);
    } catch (error) {
        console.error('Error al actualizar asistencia:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteAsistencia = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const result = await asistenciaRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Asistencia no encontrada' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar asistencia:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};