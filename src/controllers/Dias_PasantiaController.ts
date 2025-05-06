import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { DiasPasantia } from '../models/Dias_pasantia';

const diasPasantiaRepository = AppDataSource.getRepository(DiasPasantia);

export const getAllDiasPasantia = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const dias = await diasPasantiaRepository.find({
            relations: ['pasantia_diapas']
        });
        return res.status(200).json(dias);
    } catch (error) {
        console.error('Error al obtener días de pasantía:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getDiasPasantiaById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const dia = await diasPasantiaRepository.findOne({
            where: { id_diapas: id },
            relations: ['pasantia_diapas']
        });

        if (!dia) {
            return res.status(404).json({ message: 'Día de pasantía no encontrado' });
        }

        return res.status(200).json(dia);
    } catch (error) {
        console.error('Error al obtener día de pasantía:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createDiasPasantia = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newDia = diasPasantiaRepository.create({
            ...req.body,
            creacion_diapas: new Date()
        });
        const savedDia = await diasPasantiaRepository.save(newDia);
        return res.status(201).json(savedDia);
    } catch (error) {
        console.error('Error al crear día de pasantía:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateDiasPasantia = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const dia = await diasPasantiaRepository.findOne({
            where: { id_diapas: id }
        });

        if (!dia) {
            return res.status(404).json({ message: 'Día de pasantía no encontrado' });
        }

        diasPasantiaRepository.merge(dia, req.body);
        const updatedDia = await diasPasantiaRepository.save(dia);
        return res.status(200).json(updatedDia);
    } catch (error) {
        console.error('Error al actualizar día de pasantía:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteDiasPasantia = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const result = await diasPasantiaRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Día de pasantía no encontrado' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar día de pasantía:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};