import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Estudiante } from '../models/Estudiante';

const estudianteRepository = AppDataSource.getRepository(Estudiante);

export const getAllEstudiantes = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const estudiantes = await estudianteRepository.find({
            relations: ['usuario_est', 'contacto_est', 'taller_est', 'direccion_id', 'ciclo_escolar_est']
        });
        return res.status(200).json(estudiantes);
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getEstudianteById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const estudiante = await estudianteRepository.findOne({
            where: { documento_id_est: id },
            relations: ['usuario_est', 'contacto_est', 'taller_est', 'direccion_id', 'ciclo_escolar_est']
        });

        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        return res.status(200).json(estudiante);
    } catch (error) {
        console.error('Error al obtener estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createEstudiante = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newEstudiante = estudianteRepository.create(req.body);
        const savedEstudiante = await estudianteRepository.save(newEstudiante);
        return res.status(201).json(savedEstudiante);
    } catch (error) {
        console.error('Error al crear estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateEstudiante = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const estudiante = await estudianteRepository.findOne({
            where: { documento_id_est: id }
        });

        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        estudianteRepository.merge(estudiante, req.body);
        const updatedEstudiante = await estudianteRepository.save(estudiante);
        return res.status(200).json(updatedEstudiante);
    } catch (error) {
        console.error('Error al actualizar estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteEstudiante = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const result = await estudianteRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};