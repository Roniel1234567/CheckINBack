import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Supervisor } from '../models/Supervisor';

const supervisorRepository = AppDataSource.getRepository(Supervisor);

export const getAllSupervisores = async (req: Request, res: Response) => {
    try {
        const supervisores = await supervisorRepository.find();
        return res.json(supervisores);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los supervisores' });
    }
};

export const getSupervisorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const supervisor = await supervisorRepository.findOneBy({ id_sup: parseInt(id) });
        if (!supervisor) return res.status(404).json({ message: 'Supervisor no encontrado' });
        return res.json(supervisor);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el supervisor' });
    }
};

export const createSupervisor = async (req: Request, res: Response) => {
    try {
        const newSupervisor = supervisorRepository.create(req.body);
        await supervisorRepository.save(newSupervisor);
        return res.status(201).json(newSupervisor);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el supervisor' });
    }
};

export const updateSupervisor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const supervisor = await supervisorRepository.findOneBy({ id_sup: parseInt(id) });
        if (!supervisor) return res.status(404).json({ message: 'Supervisor no encontrado' });
        
        supervisorRepository.merge(supervisor, req.body);
        await supervisorRepository.save(supervisor);
        return res.json(supervisor);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el supervisor' });
    }
};

export const deleteSupervisor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await supervisorRepository.delete({ id_sup: parseInt(id) });
        if (result.affected === 0) return res.status(404).json({ message: 'Supervisor no encontrado' });
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el supervisor' });
    }
};