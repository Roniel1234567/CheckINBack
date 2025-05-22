import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Supervisor, EstadoSupervisorType } from '../models/Supervisor';
import { CentroDeTrabajo } from '../models/CentroDeTrabajo';
import { Repository } from 'typeorm';

const supervisorRepository = AppDataSource.getRepository(Supervisor) as Repository<Supervisor>;
const centroTrabajoRepository = AppDataSource.getRepository(CentroDeTrabajo);

export const getAllSupervisores = async (req: Request, res: Response) => {
    try {
        const supervisores = await supervisorRepository.find({
            relations: ['contacto_sup', 'centro_trabajo']
        });
        return res.json(supervisores);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los supervisores' });
    }
};

export const getSupervisorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const supervisor = await supervisorRepository.findOne({
            where: { id_sup: parseInt(id) },
            relations: ['contacto_sup', 'centro_trabajo']
        });
        if (!supervisor) return res.status(404).json({ message: 'Supervisor no encontrado' });
        return res.json(supervisor);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el supervisor' });
    }
};

export const createSupervisor = async (req: Request, res: Response) => {
    try {
        if (Array.isArray(req.body)) {
            return res.status(400).json({ message: 'El body no debe ser un arreglo, solo un objeto.' });
        }
        const { id_centro, ...supervisorData } = req.body;

        // Si supervisorData es un arreglo, toma el primer elemento
        const data = Array.isArray(supervisorData) ? supervisorData[0] : supervisorData;
        let newSupervisor = supervisorRepository.create(data);

        if (Array.isArray(newSupervisor)) {
            return res.status(400).json({ message: 'Error interno: newSupervisor no debe ser un arreglo.' });
        }
        // Forzar el tipado para que TypeScript reconozca las propiedades
        const supervisorObj: Supervisor = newSupervisor as Supervisor;

        if (id_centro) {
            const centro = await centroTrabajoRepository.findOneBy({ id_centro: id_centro });
            if (!centro) {
                return res.status(400).json({ message: 'El centro de trabajo especificado no existe' });
            }
            supervisorObj.centro_trabajo = centro;
        }

        await supervisorRepository.save(supervisorObj);
        return res.status(201).json(supervisorObj);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el supervisor' });
    }
};

export const updateSupervisor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { id_centro, ...supervisorData } = req.body;
        
        const supervisor = await supervisorRepository.findOneBy({ id_sup: parseInt(id) });
        if (!supervisor) return res.status(404).json({ message: 'Supervisor no encontrado' });
        
        if (id_centro !== undefined) {
            if (id_centro === null) {
                supervisor.centro_trabajo = undefined;
            } else {
                const centro = await centroTrabajoRepository.findOneBy({ id_centro: id_centro });
                if (!centro) {
                    return res.status(400).json({ message: 'El centro de trabajo especificado no existe' });
                }
                supervisor.centro_trabajo = centro;
            }
        }
        
        supervisorRepository.merge(supervisor, supervisorData);
        await supervisorRepository.save(supervisor);
        return res.json(supervisor);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el supervisor' });
    }
};

export const updateSupervisorEstado = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { estado_sup } = req.body;
        
        // Validar que el estado sea válido
        if (estado_sup !== 'Activo' && estado_sup !== 'Inactivo') {
            return res.status(400).json({ message: 'El estado debe ser "Activo" o "Inactivo"' });
        }
        
        const supervisor = await supervisorRepository.findOneBy({ id_sup: parseInt(id) });
        if (!supervisor) return res.status(404).json({ message: 'Supervisor no encontrado' });
        
        supervisor.estado_sup = estado_sup as EstadoSupervisorType;
        await supervisorRepository.save(supervisor);
        
        return res.json(supervisor);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el estado del supervisor' });
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

export const getSupervisoresPorCentro = async (req: Request, res: Response) => {
    try {
        const { idCentro } = req.params;
        const supervisores = await supervisorRepository.find({
            where: { centro_trabajo: { id_centro: parseInt(idCentro) } },
            relations: ['contacto_sup', 'centro_trabajo']
        });
        return res.json(supervisores);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los supervisores por centro de trabajo' });
    }
};