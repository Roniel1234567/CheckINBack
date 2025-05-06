import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Visita } from '../models/Visita';

const visitaRepository = AppDataSource.getRepository(Visita);

export const getAllVisitas = async (req: Request, res: Response) => {
    try {
        const visitas = await visitaRepository.find();
        return res.json(visitas);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las visitas' });
    }
};

export const getVisitaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const visita = await visitaRepository.findOneBy({ id_vis: parseInt(id) });
        if (!visita) return res.status(404).json({ message: 'Visita no encontrada' });
        return res.json(visita);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener la visita' });
    }
};

export const createVisita = async (req: Request, res: Response) => {
    try {
        const newVisita = visitaRepository.create(req.body);
        await visitaRepository.save(newVisita);
        return res.status(201).json(newVisita);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear la visita' });
    }
};

export const updateVisita = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const visita = await visitaRepository.findOneBy({ id_vis: parseInt(id) });
        if (!visita) return res.status(404).json({ message: 'Visita no encontrada' });
        
        visitaRepository.merge(visita, req.body);
        await visitaRepository.save(visita);
        return res.json(visita);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la visita' });
    }
};

export const deleteVisita = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await visitaRepository.delete({ id_vis: parseInt(id) });
        if (result.affected === 0) return res.status(404).json({ message: 'Visita no encontrada' });
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la visita' });
    }
};