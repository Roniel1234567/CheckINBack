import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { VisitaEstudiante } from '../models/Visita_estudiante';

const visitaEstudianteRepository = AppDataSource.getRepository(VisitaEstudiante);

export const getAllVisitasEstudiantes = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const visitasEstudiantes = await visitaEstudianteRepository.find({
            relations: ['visita', 'estudiante_vis']
        });
        return res.status(200).json(visitasEstudiantes);
    } catch (error) {
        console.error('Error al obtener visitas de estudiantes:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getVisitaEstudianteById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const visitaEstudiante = await visitaEstudianteRepository.findOne({
            where: { visita_est: id },
            relations: ['visita', 'estudiante_vis']
        });

        if (!visitaEstudiante) {
            return res.status(404).json({ message: 'Visita de estudiante no encontrada' });
        }

        return res.status(200).json(visitaEstudiante);
    } catch (error) {
        console.error('Error al obtener visita de estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createVisitaEstudiante = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newVisitaEstudiante = visitaEstudianteRepository.create(req.body);
        const savedVisitaEstudiante = await visitaEstudianteRepository.save(newVisitaEstudiante);
        return res.status(201).json(savedVisitaEstudiante);
    } catch (error) {
        console.error('Error al crear visita de estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateVisitaEstudiante = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const visitaEstudiante = await visitaEstudianteRepository.findOne({
            where: { visita_est: id }
        });

        if (!visitaEstudiante) {
            return res.status(404).json({ message: 'Visita de estudiante no encontrada' });
        }

        visitaEstudianteRepository.merge(visitaEstudiante, req.body);
        const updatedVisitaEstudiante = await visitaEstudianteRepository.save(visitaEstudiante);
        return res.status(200).json(updatedVisitaEstudiante);
    } catch (error) {
        console.error('Error al actualizar visita de estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteVisitaEstudiante = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const result = await visitaEstudianteRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Visita de estudiante no encontrada' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar visita de estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};