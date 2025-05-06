import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Rol } from '../models/Rol';

const rolRepository = AppDataSource.getRepository(Rol);

export const getAllRoles = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const roles = await rolRepository.find();
        return res.status(200).json(roles);
    } catch (error) {
        console.error('Error al obtener roles:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getRolById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const rol = await rolRepository.findOne({
            where: { id_rol: id }
        });

        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        return res.status(200).json(rol);
    } catch (error) {
        console.error('Error al obtener rol:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createRol = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newRol = rolRepository.create(req.body);
        const savedRol = await rolRepository.save(newRol);
        return res.status(201).json(savedRol);
    } catch (error) {
        console.error('Error al crear rol:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateRol = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const rol = await rolRepository.findOne({
            where: { id_rol: id }
        });

        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        rolRepository.merge(rol, req.body);
        const updatedRol = await rolRepository.save(rol);
        return res.status(200).json(updatedRol);
    } catch (error) {
        console.error('Error al actualizar rol:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteRol = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const result = await rolRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar rol:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};