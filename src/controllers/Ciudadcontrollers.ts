import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Ciudad } from '../models/Ciudad';

const ciudadRepository = AppDataSource.getRepository(Ciudad);

export const getAllCiudades = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const ciudades = await ciudadRepository.find({
            relations: ['provincia']
        });
        return res.status(200).json(ciudades);
    } catch (error) {
        console.error('Error getting ciudades:', error);
        return res.status(500).json({
            message: 'Error getting ciudades',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const getCiudadById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const ciudad = await ciudadRepository.findOne({
            where: { id_ciu: parseInt(id) },
            relations: ['provincia_ciu']
        });

        if (!ciudad) {
            return res.status(404).json({
                message: 'Ciudad not found'
            });
        }

        return res.json(ciudad);
    } catch (error) {
        console.error('Error getting ciudad:', error);
        return res.status(500).json({
            message: 'Error getting ciudad',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const createCiudad = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newCiudad = ciudadRepository.create(req.body);
        const savedCiudad = await ciudadRepository.save(newCiudad);
        return res.status(201).json(savedCiudad);
    } catch (error) {
        console.error('Error al crear ciudad:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateCiudad = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const ciudad = await ciudadRepository.findOne({
            where: { id_ciu: id }
        });

        if (!ciudad) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }

        ciudadRepository.merge(ciudad, req.body);
        const updatedCiudad = await ciudadRepository.save(ciudad);
        return res.status(200).json(updatedCiudad);
    } catch (error) {
        console.error('Error al actualizar ciudad:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteCiudad = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const result = await ciudadRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar ciudad:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getCiudadesByProvincia = async (req: Request, res: Response) => {
    try {
        const provinciaId = parseInt(req.params.provinciaId);
        const ciudades = await AppDataSource
            .getRepository(Ciudad)
            .find({
                where: { provincia_ciu: provinciaId },
                relations: ['provincia']
            });
        return res.json(ciudades);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener ciudades' });
    }
};
