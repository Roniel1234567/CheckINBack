import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Excusa } from '../models/Excusa';

const excusaRepository = AppDataSource.getRepository(Excusa);

export const getAllExcusas = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const excusas = await excusaRepository.find({
            relations: ['pasantia_exc']
        });
        return res.status(200).json(excusas);
    } catch (error) {
        console.error('Error al obtener excusas:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getExcusaById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const excusa = await excusaRepository.findOne({
            where: { id_exc: id },
            relations: ['pasantia_exc']
        });

        if (!excusa) {
            return res.status(404).json({ message: 'Excusa no encontrada' });
        }

        return res.status(200).json(excusa);
    } catch (error) {
        console.error('Error al obtener excusa:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createExcusa = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newExcusa = excusaRepository.create(req.body);
        const savedExcusa = await excusaRepository.save(newExcusa);
        return res.status(201).json(savedExcusa);
    } catch (error) {
        console.error('Error al crear excusa:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateExcusa = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const excusa = await excusaRepository.findOne({
            where: { id_exc: id }
        });

        if (!excusa) {
            return res.status(404).json({ message: 'Excusa no encontrada' });
        }

        excusaRepository.merge(excusa, req.body);
        const updatedExcusa = await excusaRepository.save(excusa);
        return res.status(200).json(updatedExcusa);
    } catch (error) {
        console.error('Error al actualizar excusa:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteExcusa = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const result = await excusaRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Excusa no encontrada' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar excusa:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};