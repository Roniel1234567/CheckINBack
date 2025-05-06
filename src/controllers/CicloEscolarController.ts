import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { CicloEscolar } from '../models/CicloEscolar';

const cicloEscolarRepository = AppDataSource.getRepository(CicloEscolar);

export const getAllCiclosEscolares = async (req: Request, res: Response) => {
    try {
        const ciclos = await cicloEscolarRepository.find();
        return res.json(ciclos);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los ciclos escolares' });
    }
};

export const getCicloEscolarById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ciclo = await cicloEscolarRepository.findOneBy({ id_ciclo: parseInt(id) });
        if (!ciclo) return res.status(404).json({ message: 'Ciclo escolar no encontrado' });
        return res.json(ciclo);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el ciclo escolar' });
    }
};

export const createCicloEscolar = async (req: Request, res: Response) => {
    try {
        const newCiclo = cicloEscolarRepository.create(req.body);
        await cicloEscolarRepository.save(newCiclo);
        return res.status(201).json(newCiclo);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el ciclo escolar' });
    }
};

export const updateCicloEscolar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ciclo = await cicloEscolarRepository.findOneBy({ id_ciclo: parseInt(id) });
        if (!ciclo) return res.status(404).json({ message: 'Ciclo escolar no encontrado' });
        
        cicloEscolarRepository.merge(ciclo, req.body);
        await cicloEscolarRepository.save(ciclo);
        return res.json(ciclo);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el ciclo escolar' });
    }
};

export const deleteCicloEscolar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await cicloEscolarRepository.delete({ id_ciclo: parseInt(id) });
        if (result.affected === 0) return res.status(404).json({ message: 'Ciclo escolar no encontrado' });
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el ciclo escolar' });
    }
};