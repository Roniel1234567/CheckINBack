import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ModuloPasantia } from '../models/ModuloPasantia';

const moduloRepository = AppDataSource.getRepository(ModuloPasantia);

export const getAllModulos = async (_req: Request, res: Response) => {
  try {
    const modulos = await moduloRepository.find({
      relations: ['pasantia', 'calificacion_estudiante']
    });
    return res.status(200).json(modulos);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los módulos' });
  }
};

export const getModuloById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    const modulo = await moduloRepository.findOne({
      where: { id_modulo: id },
      relations: ['pasantia', 'calificacion_estudiante']
    });
    if (!modulo) {
      return res.status(404).json({ message: 'Módulo no encontrado' });
    }
    return res.status(200).json(modulo);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el módulo' });
  }
};

export const createModulo = async (req: Request, res: Response) => {
  try {
    const nuevoModulo = moduloRepository.create(req.body);
    const savedModulo = await moduloRepository.save(nuevoModulo);
    return res.status(201).json(savedModulo);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el módulo' });
  }
};

export const updateModulo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    const modulo = await moduloRepository.findOne({ where: { id_modulo: id } });
    if (!modulo) {
      return res.status(404).json({ message: 'Módulo no encontrado' });
    }
    moduloRepository.merge(modulo, req.body);
    const updatedModulo = await moduloRepository.save(modulo);
    return res.status(200).json(updatedModulo);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el módulo' });
  }
};

export const deleteModulo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    const result = await moduloRepository.delete(id);
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Módulo no encontrado' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el módulo' });
  }
}; 