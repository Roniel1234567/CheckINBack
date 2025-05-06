import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { EvaluacionCentroTrabajo } from '../models/Evaluacion_centro';

const evaluacionRepository = AppDataSource.getRepository(EvaluacionCentroTrabajo);

// Get all evaluaciones
export const getAllEvaluacionesCentro = async (req: Request, res: Response) => {
    try {
        const evaluaciones = await evaluacionRepository.find();
        return res.json(evaluaciones);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener evaluaciones' });
    }
};

// Get evaluacion by ID
export const getEvaluacionCentroById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const evaluacion = await evaluacionRepository.findOneBy({ id_eval_centro: id });
        if (!evaluacion) return res.status(404).json({ message: 'Evaluación no encontrada' });
        return res.json(evaluacion);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener evaluación' });
    }
};

// Create evaluacion
export const createEvaluacionCentro = async (req: Request, res: Response) => {
    try {
        const evaluacion = evaluacionRepository.create(req.body);
        await evaluacionRepository.save(evaluacion);
        return res.status(201).json(evaluacion);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear evaluación' });
    }
};

// Update evaluacion
export const updateEvaluacionCentro = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const evaluacion = await evaluacionRepository.findOneBy({ id_eval_centro: id });
        if (!evaluacion) return res.status(404).json({ message: 'Evaluación no encontrada' });
        evaluacionRepository.merge(evaluacion, req.body);
        await evaluacionRepository.save(evaluacion);
        return res.json(evaluacion);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar evaluación' });
    }
};

// Delete evaluacion
export const deleteEvaluacionCentro = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await evaluacionRepository.delete(id);
        if (result.affected === 0) return res.status(404).json({ message: 'Evaluación no encontrada' });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar evaluación' });
    }
};