import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Estudiante } from '../models/Estudiante';
import { DocEstudiante } from '../models/DocEstudiante';
import { Poliza } from '../models/Poliza';
import { CentroDeTrabajo } from '../models/CentroDeTrabajo';

const estudianteRepository = AppDataSource.getRepository(Estudiante);
const polizaRepository = AppDataSource.getRepository(Poliza);
const centroTrabajoRepository = AppDataSource.getRepository(CentroDeTrabajo);

export const getAllEstudiantes = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const estudiantes = await estudianteRepository.find({
            relations: ['usuario_est', 'contacto_est', 'taller_est', 'direccion_id', 'ciclo_escolar_est', 'poliza']
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
            relations: ['usuario_est', 'contacto_est', 'taller_est', 'direccion_id', 'ciclo_escolar_est', 'poliza']
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
    console.log('BODY QUE LLEGA:', req.body);
    try {
        const estudianteData = req.body;

        // Mapea los campos relacionales a objetos con id
        if (estudianteData.usuario_est)
            estudianteData.usuario_est = { id_usuario: Number(estudianteData.usuario_est) };
        if (estudianteData.contacto_est)
            estudianteData.contacto_est = { id_contacto: Number(estudianteData.contacto_est) };
        if (estudianteData.taller_est)
            estudianteData.taller_est = { id_taller: Number(estudianteData.taller_est) };
        if (estudianteData.direccion_id)
            estudianteData.direccion_id = { id_dir: Number(estudianteData.direccion_id) };
        if (estudianteData.ciclo_escolar_est)
            estudianteData.ciclo_escolar_est = { id_ciclo: Number(estudianteData.ciclo_escolar_est) };
        if (estudianteData.id_poliza)
            estudianteData.poliza = { id_poliza: Number(estudianteData.id_poliza) };

        // Validar campos requeridos
        const camposRequeridos = ['documento_id_est', 'nombre_est', 'apellido_est', 'fecha_nac_est'];
        const camposFaltantes = camposRequeridos.filter(campo => !estudianteData[campo]);
        
        if (camposFaltantes.length > 0) {
            return res.status(400).json({
                message: 'Campos requeridos faltantes',
                campos: camposFaltantes
            });
        }

        // Validar y limpiar el campo documento_id_est
        if (typeof estudianteData.documento_id_est !== 'string' || !estudianteData.documento_id_est.trim()) {
            return res.status(400).json({ message: 'El campo documento_id_est es obligatorio y no puede estar vacío.' });
        }
        estudianteData.documento_id_est = estudianteData.documento_id_est.trim();

        // Verificar si el estudiante ya existe
        const estudianteExistente = await estudianteRepository.findOne({
            where: { documento_id_est: estudianteData.documento_id_est }
        });

        if (estudianteExistente) {
            return res.status(400).json({ message: 'Ya existe un estudiante con este documento' });
        }

        const estudiante = await estudianteRepository.save(estudianteData);
        const documentoId = estudiante.documento_id_est?.trim();

        if (!documentoId) {
            throw new Error('El documento del estudiante no puede estar vacío');
        }

        const docEstudianteRepository = AppDataSource.getRepository(DocEstudiante);
        const docEstudianteExistente = await docEstudianteRepository.findOne({
            where: { est_doc: documentoId }
        });
        if (!docEstudianteExistente) {
            const nuevoDocEstudiante = docEstudianteRepository.create({
                est_doc: documentoId
            });
            await docEstudianteRepository.save(nuevoDocEstudiante);
        }

        return res.status(201).json({
            message: 'Estudiante creado exitosamente',
            estudiante
        });
    } catch (error) {
        console.error('Error al crear estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateEstudiante = async (req: Request, res: Response): Promise<Response> => {
    console.log('ENTRANDO A updateEstudiante', req.originalUrl, req.body);
    try {
        const { id } = req.params;
        const estudianteData = req.body;

        if (estudianteData.id_poliza)
            estudianteData.poliza = { id_poliza: Number(estudianteData.id_poliza) };

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

export const updateFecha = async (req: Request, res: Response) => {
  console.log('ENTRANDO A updateFecha', req.originalUrl, req.body);
  const documento_id_est = req.params.id;
  const { fecha_inicio_pasantia, fecha_fin_pasantia, horaspasrealizadas_est } = req.body;

  try {
    const result = await estudianteRepository.update(
      { documento_id_est },
      { fecha_inicio_pasantia, fecha_fin_pasantia, horaspasrealizadas_est }
    );

    if (result.affected === 0) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }

    // Devuelve el estudiante actualizado
    const estudiante = await estudianteRepository.findOne({ where: { documento_id_est } });
    return res.json(estudiante);
  } catch (error) {
    console.error('Error al actualizar fechas:', error);
    return res.status(500).json({ message: 'Error interno al actualizar fechas' });
  }
};

export const updateEstudiantePoliza = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { id_poliza } = req.body;

        // Solo actualiza el campo poliza (id_poliza) en la tabla estudiante
        const result = await estudianteRepository.update(
            { documento_id_est: id },
            { poliza: id_poliza ? { id_poliza: Number(id_poliza) } : undefined }
        );

        if (result.affected === 0) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Devuelve el estudiante actualizado
        const estudiante = await estudianteRepository.findOne({ where: { documento_id_est: id }, relations: ['poliza'] });
        return res.status(200).json({
            message: 'Póliza asignada correctamente',
            estudiante
        });
    } catch (error) {
        console.error('Error al actualizar póliza del estudiante:', error);
        return res.status(500).json({ message: 'Error interno al actualizar póliza' });
    }
};