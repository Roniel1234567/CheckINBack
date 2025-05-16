import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Poliza } from '../models/Poliza';

const polizaRepository = AppDataSource.getRepository(Poliza);

export const getAllPolizas = async (_req: Request, res: Response) => {
    try {
        const polizas = await polizaRepository.find();
        return res.json(polizas);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las pólizas' });
    }
};

export const getPolizaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const poliza = await polizaRepository.findOneBy({ id_poliza: parseInt(id) });
        if (!poliza) return res.status(404).json({ message: 'Póliza no encontrada' });
        return res.json(poliza);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener la póliza' });
    }
};

export const createPoliza = async (req: Request, res: Response) => {
    try {
        const newPoliza = polizaRepository.create(req.body);
        await polizaRepository.save(newPoliza);
        return res.status(201).json(newPoliza);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear la póliza' });
    }
};

export const updatePoliza = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const poliza = await polizaRepository.findOneBy({ id_poliza: parseInt(id) });
        if (!poliza) return res.status(404).json({ message: 'Póliza no encontrada' });
        polizaRepository.merge(poliza, req.body);
        await polizaRepository.save(poliza);
        return res.json(poliza);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la póliza' });
    }
};

export const deletePoliza = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await polizaRepository.delete({ id_poliza: parseInt(id) });
        if (result.affected === 0) return res.status(404).json({ message: 'Póliza no encontrada' });
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la póliza' });
    }
}; 