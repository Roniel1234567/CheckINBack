import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { PlazasCentro } from '../models/Plazas';

const plazasRepository = AppDataSource.getRepository(PlazasCentro);

export const getAllPlazas = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const plazas = await plazasRepository.find({
            relations: ['centro_plaza', 'taller_plaza']
        });
        return res.status(200).json(plazas);
    } catch (error) {
        console.error('Error al obtener plazas:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getPlazaById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const plaza = await plazasRepository.findOne({
            where: { id_plaza: id },
            relations: ['centro_plaza', 'taller_plaza']
        });

        if (!plaza) {
            return res.status(404).json({ message: 'Plaza no encontrada' });
        }

        return res.status(200).json(plaza);
    } catch (error) {
        console.error('Error al obtener plaza:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createPlaza = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newPlaza = plazasRepository.create({
            ...req.body,
            creacion_plaza: new Date()
        });
        const savedPlaza = await plazasRepository.save(newPlaza);
        return res.status(201).json(savedPlaza);
    } catch (error) {
        console.error('Error al crear plaza:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updatePlaza = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const plaza = await plazasRepository.findOne({
            where: { id_plaza: id }
        });

        if (!plaza) {
            return res.status(404).json({ message: 'Plaza no encontrada' });
        }

        plazasRepository.merge(plaza, req.body);
        const updatedPlaza = await plazasRepository.save(plaza);
        return res.status(200).json(updatedPlaza);
    } catch (error) {
        console.error('Error al actualizar plaza:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deletePlaza = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const result = await plazasRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Plaza no encontrada' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar plaza:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};