import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { CalificacionEstudiante } from '../models/CalificacionEstudiante';

const calificacionRepository = AppDataSource.getRepository(CalificacionEstudiante);

export const getAllCalificaciones = async (req: Request, res: Response) => {
    try {
        const calificaciones = await calificacionRepository.find({
            relations: ['evaluacion_estudiante']
        });
        return res.json(calificaciones);
    } catch (error) {
        console.error('Error al obtener calificaciones:', error);
        return res.status(500).json({ message: 'Error al obtener calificaciones' });
    }
};

export const getCalificacionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const calificacion = await calificacionRepository.findOne({
            where: { id_calificacion: parseInt(id) },
            relations: ['evaluacion_estudiante']
        });
        
        if (!calificacion) return res.status(404).json({ message: 'Calificación no encontrada' });
        return res.json(calificacion);
    } catch (error) {
        console.error('Error al obtener calificación:', error);
        return res.status(500).json({ message: 'Error al obtener calificación' });
    }
};

export const getCalificacionesByEvaluacionId = async (req: Request, res: Response) => {
    try {
        const { idEvaluacion } = req.params;
        const calificaciones = await calificacionRepository.find({
            where: {
                evaluacion_estudiante: { id_eval_est: parseInt(idEvaluacion) }
            },
            relations: ['evaluacion_estudiante']
        });
        
        return res.json(calificaciones);
    } catch (error) {
        console.error('Error al obtener calificaciones por evaluación:', error);
        return res.status(500).json({ message: 'Error al obtener calificaciones por evaluación' });
    }
};

export const createCalificacion = async (req: Request, res: Response) => {
    try {
        const newCalificacion = calificacionRepository.create(req.body);
        await calificacionRepository.save(newCalificacion);
        return res.status(201).json(newCalificacion);
    } catch (error) {
        console.error('Error al crear calificación:', error);
        return res.status(500).json({ message: 'Error al crear calificación' });
    }
};

export const updateCalificacion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const calificacion = await calificacionRepository.findOneBy({ id_calificacion: parseInt(id) });
        if (!calificacion) return res.status(404).json({ message: 'Calificación no encontrada' });
        
        calificacionRepository.merge(calificacion, req.body);
        await calificacionRepository.save(calificacion);
        return res.json(calificacion);
    } catch (error) {
        console.error('Error al actualizar calificación:', error);
        return res.status(500).json({ message: 'Error al actualizar calificación' });
    }
};

export const deleteCalificacion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await calificacionRepository.delete({ id_calificacion: parseInt(id) });
        if (result.affected === 0) return res.status(404).json({ message: 'Calificación no encontrada' });
        return res.status(204).json();
    } catch (error) {
        console.error('Error al eliminar calificación:', error);
        return res.status(500).json({ message: 'Error al eliminar calificación' });
    }
}; 