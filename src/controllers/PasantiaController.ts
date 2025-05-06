import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Pasantia } from '../models/Pasantia';

const pasantiaRepository = AppDataSource.getRepository(Pasantia);

export const getAllPasantias = async (req: Request, res: Response) => {
    try {
        const pasantias = await pasantiaRepository.find();
        return res.json(pasantias);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las pasantías' });
    }
};

export const getPasantiaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const pasantia = await pasantiaRepository.findOneBy({ id_pas: parseInt(id) });
        if (!pasantia) return res.status(404).json({ message: 'Pasantía no encontrada' });
        return res.json(pasantia);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener la pasantía' });
    }
};

export const createPasantia = async (req: Request, res: Response) => {
    try {
        const newPasantia = pasantiaRepository.create(req.body);
        await pasantiaRepository.save(newPasantia);
        return res.status(201).json(newPasantia);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear la pasantía' });
    }
};

export const updatePasantia = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const pasantia = await pasantiaRepository.findOneBy({ id_pas: parseInt(id) });
        if (!pasantia) return res.status(404).json({ message: 'Pasantía no encontrada' });
        
        pasantiaRepository.merge(pasantia, req.body);
        await pasantiaRepository.save(pasantia);
        return res.json(pasantia);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la pasantía' });
    }
};

export const deletePasantia = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pasantiaRepository.delete({ id_pas: parseInt(id) });
        if (result.affected === 0) return res.status(404).json({ message: 'Pasantía no encontrada' });
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la pasantía' });
    }
};