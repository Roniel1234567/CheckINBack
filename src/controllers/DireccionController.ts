import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Direccion } from '../models/Direccion';

const direccionRepository = AppDataSource.getRepository(Direccion);

export const getAllDirecciones = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const direcciones = await direccionRepository.find({
            relations: ['sector_dir']
        });
        return res.status(200).json(direcciones);
    } catch (error) {
        console.error('Error al obtener direcciones:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getDireccionById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const direccion = await direccionRepository.findOne({
            where: { id_dir: id },
            relations: ['sector_dir']
        });

        if (!direccion) {
            return res.status(404).json({ message: 'Dirección no encontrada' });
        }

        return res.status(200).json(direccion);
    } catch (error) {
        console.error('Error al obtener dirección:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createDireccion = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newDireccion = direccionRepository.create(req.body);
        const savedDireccion = await direccionRepository.save(newDireccion);
        return res.status(201).json(savedDireccion);
    } catch (error) {
        console.error('Error al crear dirección:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateDireccion = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const direccion = await direccionRepository.findOne({
            where: { id_dir: id }
        });

        if (!direccion) {
            return res.status(404).json({ message: 'Dirección no encontrada' });
        }

        direccionRepository.merge(direccion, req.body);
        const updatedDireccion = await direccionRepository.save(direccion);
        return res.status(200).json(updatedDireccion);
    } catch (error) {
        console.error('Error al actualizar dirección:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteDireccion = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const result = await direccionRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Dirección no encontrada' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar dirección:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};