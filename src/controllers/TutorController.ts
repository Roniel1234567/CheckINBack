import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Tutor } from '../models/Tutor';

const tutorRepository = AppDataSource.getRepository(Tutor);

export const getAllTutores = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const tutores = await tutorRepository.find({
            relations: ['usuario_tutor', 'contacto_tutor']
        });
        return res.status(200).json(tutores);
    } catch (error) {
        console.error('Error al obtener tutores:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getTutorById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const tutor = await tutorRepository.findOne({
            where: { id_tutor: id },
            relations: ['usuario_tutor', 'contacto_tutor']
        });

        if (!tutor) {
            return res.status(404).json({ message: 'Tutor no encontrado' });
        }

        return res.status(200).json(tutor);
    } catch (error) {
        console.error('Error al obtener tutor:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createTutor = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newTutor = tutorRepository.create(req.body);
        const savedTutor = await tutorRepository.save(newTutor);
        return res.status(201).json(savedTutor);
    } catch (error) {
        console.error('Error al crear tutor:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateTutor = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const tutor = await tutorRepository.findOne({
            where: { id_tutor: id }
        });

        if (!tutor) {
            return res.status(404).json({ message: 'Tutor no encontrado' });
        }

        tutorRepository.merge(tutor, req.body);
        const updatedTutor = await tutorRepository.save(tutor);
        return res.status(200).json(updatedTutor);
    } catch (error) {
        console.error('Error al actualizar tutor:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteTutor = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const result = await tutorRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Tutor no encontrado' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar tutor:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};