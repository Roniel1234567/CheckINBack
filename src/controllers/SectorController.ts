import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Sector } from '../models/Sector';

const sectorRepository = AppDataSource.getRepository(Sector);

export const getAllSectores = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const sectores = await sectorRepository.find({
            relations: ['ciudad']
        });
        return res.json(sectores);
    } catch (error) {
        console.error('Error getting sectores:', error);
        return res.status(500).json({ message: 'Error al obtener sectores' });
    }
};

export const getSectorById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const sector = await sectorRepository.findOne({
            where: { id_sec: parseInt(id) },
            relations: ['ciudad']
        });

        if (!sector) {
            return res.status(404).json({ message: 'Sector no encontrado' });
        }

        return res.json(sector);
    } catch (error) {
        console.error('Error getting sector:', error);
        return res.status(500).json({ message: 'Error al obtener sector' });
    }
};

export const createSector = async (req: Request, res: Response): Promise<Response> => {
    try {
        const sector = sectorRepository.create(req.body);
        const result = await sectorRepository.save(sector);
        return res.status(201).json(result);
    } catch (error) {
        console.error('Error creating sector:', error);
        return res.status(500).json({ message: 'Error al crear sector' });
    }
};

export const updateSector = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const sector = await sectorRepository.findOne({
            where: { id_sec: parseInt(id) }
        });

        if (!sector) {
            return res.status(404).json({ message: 'Sector no encontrado' });
        }

        sectorRepository.merge(sector, req.body);
        const result = await sectorRepository.save(sector);
        return res.json(result);
    } catch (error) {
        console.error('Error updating sector:', error);
        return res.status(500).json({ message: 'Error al actualizar sector' });
    }
};

export const deleteSector = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const result = await sectorRepository.delete(parseInt(id));
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Sector no encontrado' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting sector:', error);
        return res.status(500).json({ message: 'Error al eliminar sector' });
    }
};

export const getSectoresByCiudad = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { ciudadId } = req.params;
        const sectores = await sectorRepository.find({
            where: { ciudad_sec: parseInt(ciudadId) },
            relations: ['ciudad']
        });
        return res.json(sectores);
    } catch (error) {
        console.error('Error getting sectores by ciudad:', error);
        return res.status(500).json({ message: 'Error al obtener sectores por ciudad' });
    }
};