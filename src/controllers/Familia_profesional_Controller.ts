import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { FamiliaProfesional } from '../models/familia_profecional';

const familiaProfesionalRepository = AppDataSource.getRepository(FamiliaProfesional);

export const getAllFamiliasProfesionales = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const familias = await familiaProfesionalRepository.find();
        return res.status(200).json(familias);
    } catch (error) {
        console.error('Error al obtener familias profesionales:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getFamiliaProfesionalById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        if (!id || id.length !== 3) {
            return res.status(400).json({ message: 'ID inválido - debe ser de 3 caracteres' });
        }

        const familia = await familiaProfesionalRepository.findOne({
            where: { id_fam: id }
        });

        if (!familia) {
            return res.status(404).json({ message: 'Familia profesional no encontrada' });
        }

        return res.status(200).json(familia);
    } catch (error) {
        console.error('Error al obtener familia profesional:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createFamiliaProfesional = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newFamilia = familiaProfesionalRepository.create(req.body);
        const savedFamilia = await familiaProfesionalRepository.save(newFamilia);
        return res.status(201).json(savedFamilia);
    } catch (error) {
        console.error('Error al crear familia profesional:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateFamiliaProfesional = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        if (!id || id.length !== 3) {
            return res.status(400).json({ message: 'ID inválido - debe ser de 3 caracteres' });
        }

        const familia = await familiaProfesionalRepository.findOne({
            where: { id_fam: id }
        });

        if (!familia) {
            return res.status(404).json({ message: 'Familia profesional no encontrada' });
        }

        familiaProfesionalRepository.merge(familia, req.body);
        const updatedFamilia = await familiaProfesionalRepository.save(familia);
        return res.status(200).json(updatedFamilia);
    } catch (error) {
        console.error('Error al actualizar familia profesional:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteFamiliaProfesional = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        if (!id || id.length !== 3) {
            return res.status(400).json({ message: 'ID inválido - debe ser de 3 caracteres' });
        }

        const result = await familiaProfesionalRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Familia profesional no encontrada' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar familia profesional:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};