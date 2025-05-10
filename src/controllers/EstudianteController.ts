import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Estudiante } from '../models/Estudiante';

const estudianteRepository = AppDataSource.getRepository(Estudiante);

export const getAllEstudiantes = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const estudiantes = await estudianteRepository.find({
            relations: ['usuario_est', 'contacto_est', 'taller_est', 'direccion_id', 'ciclo_escolar_est']
        });
        return res.status(200).json(estudiantes);
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getEstudianteById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const estudiante = await estudianteRepository.findOne({
            where: { documento_id_est: id },
            relations: ['usuario_est', 'contacto_est', 'taller_est', 'direccion_id', 'ciclo_escolar_est']
        });

        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        return res.status(200).json(estudiante);
    } catch (error) {
        console.error('Error al obtener estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createEstudiante = async (req: Request, res: Response): Promise<Response> => {
    try {
        const estudianteData = req.body;
        
        // Validar campos requeridos
        const camposRequeridos = ['documento_id_est', 'nombre_est', 'apellido_est', 'fecha_nac_est'];
        const camposFaltantes = camposRequeridos.filter(campo => !estudianteData[campo]);
        
        if (camposFaltantes.length > 0) {
            return res.status(400).json({
                message: 'Campos requeridos faltantes',
                campos: camposFaltantes
            });
        }

        // Verificar si el estudiante ya existe
        const estudianteExistente = await estudianteRepository.findOne({
            where: { documento_id_est: estudianteData.documento_id_est }
        });

        if (estudianteExistente) {
            return res.status(400).json({ message: 'Ya existe un estudiante con este documento' });
        }

        const nuevoEstudiante = estudianteRepository.create(estudianteData);
        await estudianteRepository.save(nuevoEstudiante);

        return res.status(201).json({
            message: 'Estudiante creado exitosamente',
            estudiante: nuevoEstudiante
        });
    } catch (error) {
        console.error('Error al crear estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateEstudiante = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const estudianteData = req.body;

        const estudiante = await estudianteRepository.findOne({
            where: { documento_id_est: id }
        });

        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Actualizar solo los campos proporcionados
        Object.assign(estudiante, estudianteData);
        await estudianteRepository.save(estudiante);

        return res.status(200).json({
            message: 'Estudiante actualizado exitosamente',
            estudiante
        });
    } catch (error) {
        console.error('Error al actualizar estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteEstudiante = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const estudiante = await estudianteRepository.findOne({
            where: { documento_id_est: id }
        });

        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        await estudianteRepository.remove(estudiante);

        return res.status(200).json({
            message: 'Estudiante eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};