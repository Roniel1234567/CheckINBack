import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { EvaluacionEstudiante } from '../models/Evaluacion_estudiantes';

const evaluacionEstudianteRepository = AppDataSource.getRepository(EvaluacionEstudiante);

export const getAllEvaluacionesEstudiante = async (req: Request, res: Response) => {
    try {
        const evaluaciones = await evaluacionEstudianteRepository.find();
        return res.json(evaluaciones);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las evaluaciones de estudiantes' });
    }
};

export const getEvaluacionEstudianteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const evaluacion = await evaluacionEstudianteRepository.findOneBy({ id_eval_est: parseInt(id) });
        if (!evaluacion) return res.status(404).json({ message: 'Evaluación de estudiante no encontrada' });
        return res.json(evaluacion);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener la evaluación de estudiante' });
    }
};

export const createEvaluacionEstudiante = async (req: Request, res: Response) => {
    try {
        const newEvaluacion = evaluacionEstudianteRepository.create(req.body);
        await evaluacionEstudianteRepository.save(newEvaluacion);
        return res.status(201).json(newEvaluacion);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear la evaluación de estudiante' });
    }
};

export const updateEvaluacionEstudiante = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const evaluacion = await evaluacionEstudianteRepository.findOneBy({ id_eval_est: parseInt(id) });
        if (!evaluacion) return res.status(404).json({ message: 'Evaluación de estudiante no encontrada' });
        
        evaluacionEstudianteRepository.merge(evaluacion, req.body);
        await evaluacionEstudianteRepository.save(evaluacion);
        return res.json(evaluacion);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la evaluación de estudiante' });
    }
};

export const deleteEvaluacionEstudiante = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await evaluacionEstudianteRepository.delete({ id_eval_est: parseInt(id) });
        if (result.affected === 0) return res.status(404).json({ message: 'Evaluación de estudiante no encontrada' });
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la evaluación de estudiante' });
    }
};