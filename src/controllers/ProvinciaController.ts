import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Provincia } from '../models/Provincia';

const provinciaRepository = AppDataSource.getRepository(Provincia);

export const getAllProvincias = async (req: Request, res: Response) => {
    try {
        const provincias = await provinciaRepository.find();
        return res.json(provincias);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las provincias' });
    }
};

export const getProvinciaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const provincia = await provinciaRepository.findOneBy({ id_prov: parseInt(id) });
        if (!provincia) return res.status(404).json({ message: 'Provincia no encontrada' });
        return res.json(provincia);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener la provincia' });
    }
};

export const createProvincia = async (req: Request, res: Response) => {
    try {
        const newProvincia = provinciaRepository.create(req.body);
        await provinciaRepository.save(newProvincia);
        return res.status(201).json(newProvincia);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear la provincia' });
    }
};

export const updateProvincia = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const provincia = await provinciaRepository.findOneBy({ id_prov: parseInt(id) });
        if (!provincia) return res.status(404).json({ message: 'Provincia no encontrada' });
        
        provinciaRepository.merge(provincia, req.body);
        await provinciaRepository.save(provincia);
        return res.json(provincia);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la provincia' });
    }
};

export const deleteProvincia = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await provinciaRepository.delete({ id_prov: parseInt(id) });
        if (result.affected === 0) return res.status(404).json({ message: 'Provincia no encontrada' });
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la provincia' });
    }
};