import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Taller } from '../models/Taller';

const tallerRepository = AppDataSource.getRepository(Taller);

export const getAllTalleres = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const talleres = await tallerRepository.find({
            relations: ['familia_taller']
        });
        return res.status(200).json(talleres);
    } catch (error) {
        console.error('Error al obtener talleres:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getTallerById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const taller = await tallerRepository.findOne({
            where: { id_taller: id },
            relations: ['familia_taller']
        });

        if (!taller) {
            return res.status(404).json({ message: 'Taller no encontrado' });
        }

        return res.status(200).json(taller);
    } catch (error) {
        console.error('Error al obtener taller:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createTaller = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Generar ID numérico si no viene en el request
        if (!req.body.id_taller) {
            // Buscar el ID máximo y añadir 1
            const result = await AppDataSource.query('SELECT MAX(id_taller::integer) as max_id FROM taller');
            const maxId = result[0]?.max_id || 0;
            const newId = (parseInt(maxId) + 1).toString();
            req.body.id_taller = newId;
        }
        
        // Establecer valor predeterminado para horaspas_taller si no viene en el request
        if (req.body.horaspas_taller === undefined) {
            req.body.horaspas_taller = 0;
        }
        
        const newTaller = tallerRepository.create(req.body);
        const savedTaller = await tallerRepository.save(newTaller);
        return res.status(201).json(savedTaller);
    } catch (error) {
        console.error('Error al crear taller:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateTaller = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const taller = await tallerRepository.findOne({
            where: { id_taller: id }
        });

        if (!taller) {
            return res.status(404).json({ message: 'Taller no encontrado' });
        }

        tallerRepository.merge(taller, req.body);
        const updatedTaller = await tallerRepository.save(taller);
        return res.status(200).json(updatedTaller);
    } catch (error) {
        console.error('Error al actualizar taller:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteTaller = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const result = await tallerRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Taller no encontrado' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar taller:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};