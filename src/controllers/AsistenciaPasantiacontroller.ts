import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { AsistenciaPasantia } from '../models/Asistencia';

const asistenciaPasantiaRepository = AppDataSource.getRepository(AsistenciaPasantia);

export const getAllAsistenciasPasantia = async (req: Request, res: Response) => {
    try {
        const asistencias = await asistenciaPasantiaRepository.find();
        return res.json(asistencias);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las asistencias de pasantía' });
    }
};

export const getAsistenciaPasantiaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const asistencia = await asistenciaPasantiaRepository.findOneBy({ id_asis: parseInt(id) });
        if (!asistencia) return res.status(404).json({ message: 'Asistencia de pasantía no encontrada' });
        return res.json(asistencia);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener la asistencia de pasantía' });
    }
};

export const createAsistenciaPasantia = async (req: Request, res: Response) => {
    try {
        const newAsistencia = asistenciaPasantiaRepository.create(req.body);
        await asistenciaPasantiaRepository.save(newAsistencia);
        return res.status(201).json(newAsistencia);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear la asistencia de pasantía' });
    }
};

export const updateAsistenciaPasantia = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const asistencia = await asistenciaPasantiaRepository.findOneBy({ id_asis: parseInt(id) });
        if (!asistencia) return res.status(404).json({ message: 'Asistencia de pasantía no encontrada' });
        
        asistenciaPasantiaRepository.merge(asistencia, req.body);
        await asistenciaPasantiaRepository.save(asistencia);
        return res.json(asistencia);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la asistencia de pasantía' });
    }
};

export const deleteAsistenciaPasantia = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await asistenciaPasantiaRepository.delete({ id_asis: parseInt(id) });
        if (result.affected === 0) return res.status(404).json({ message: 'Asistencia de pasantía no encontrada' });
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la asistencia de pasantía' });
    }
};