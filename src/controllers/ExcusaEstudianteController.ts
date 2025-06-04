import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ExcusaEstudiante } from '../models/ExcusaEstudiante';

const excusaEstudianteRepository = AppDataSource.getRepository(ExcusaEstudiante);

export const getAllExcusasEstudiante = async (_req: Request, res: Response) => {
  try {
    const excusas = await excusaEstudianteRepository.find({
      relations: ['pasantia', 'tutor', 'estudiante']
    });
    return res.status(200).json(excusas);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener las excusas' });
  }
};

export const getExcusaEstudianteById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    const excusa = await excusaEstudianteRepository.findOne({
      where: { id_excusa: id },
      relations: ['pasantia', 'tutor', 'estudiante']
    });
    if (!excusa) {
      return res.status(404).json({ message: 'Excusa no encontrada' });
    }
    return res.status(200).json(excusa);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener la excusa' });
  }
};

export const createExcusaEstudiante = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (body.certificados && typeof body.certificados === 'string') {
      body.certificados = Buffer.from(body.certificados, 'base64');
    }
    const nuevaExcusa = excusaEstudianteRepository.create(body);
    const savedExcusa = await excusaEstudianteRepository.save(nuevaExcusa);
    return res.status(201).json(savedExcusa);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear la excusa' });
  }
};

export const updateExcusaEstudiante = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    const excusa = await excusaEstudianteRepository.findOne({ where: { id_excusa: id } });
    if (!excusa) {
      return res.status(404).json({ message: 'Excusa no encontrada' });
    }
    const body = req.body;
    if (body.certificados && typeof body.certificados === 'string') {
      body.certificados = Buffer.from(body.certificados, 'base64');
    }
    excusaEstudianteRepository.merge(excusa, body);
    const updatedExcusa = await excusaEstudianteRepository.save(excusa);
    return res.status(200).json(updatedExcusa);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar la excusa' });
  }
};

export const deleteExcusaEstudiante = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    const result = await excusaEstudianteRepository.delete(id);
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Excusa no encontrada' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar la excusa' });
  }
}; 