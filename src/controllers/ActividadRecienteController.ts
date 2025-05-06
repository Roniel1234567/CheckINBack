import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ActividadReciente } from '../models/ActividadReciente';

const actividadRecienteRepository = AppDataSource.getRepository(ActividadReciente);

export const getAllActividadesRecientes = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const actividadesRecientes = await actividadRecienteRepository.find();
        return res.status(200).json(actividadesRecientes);
    } catch (error) {
        console.error('Error al obtener actividades recientes:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getActividadRecienteById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { usuario_act, actividad, entidad_act, registro_act } = req.params;

        const actividadReciente = await actividadRecienteRepository.findOne({
            where: {
                usuario_act,
                actividad,
                entidad_act,
                registro_act: new Date(registro_act)
            }
        });

        if (!actividadReciente) {
            return res.status(404).json({ message: 'Actividad reciente no encontrada' });
        }

        return res.status(200).json(actividadReciente);
    } catch (error) {
        console.error('Error al obtener actividad reciente:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createActividadReciente = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newActividadReciente = actividadRecienteRepository.create(req.body);
        const savedActividadReciente = await actividadRecienteRepository.save(newActividadReciente);
        return res.status(201).json(savedActividadReciente);
    } catch (error) {
        console.error('Error al crear actividad reciente:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateActividadReciente = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { usuario_act, actividad, entidad_act, registro_act } = req.params;

        const actividadReciente = await actividadRecienteRepository.findOne({
            where: {
                usuario_act,
                actividad,
                entidad_act,
                registro_act: new Date(registro_act)
            }
        });

        if (!actividadReciente) {
            return res.status(404).json({ message: 'Actividad reciente no encontrada' });
        }

        actividadRecienteRepository.merge(actividadReciente, req.body);
        const updatedActividadReciente = await actividadRecienteRepository.save(actividadReciente);
        return res.status(200).json(updatedActividadReciente);
    } catch (error) {
        console.error('Error al actualizar actividad reciente:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteActividadReciente = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { usuario_act, actividad, entidad_act, registro_act } = req.params;

        const actividadReciente = await actividadRecienteRepository.findOne({
            where: {
                usuario_act,
                actividad,
                entidad_act,
                registro_act: new Date(registro_act)
            }
        });

        if (!actividadReciente) {
            return res.status(404).json({ message: 'Actividad reciente no encontrada' });
        }

        await actividadRecienteRepository.remove(actividadReciente);
        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar actividad reciente:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};