import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { CentroDeTrabajo } from '../models/CentroDeTrabajo';
import { Direccion } from '../models/Direccion';
import { Contacto } from '../models/Contacto';
import { Ciudad } from '../models/Ciudad';
import { Sector } from '../models/Sector';

const centroTrabajoRepository = AppDataSource.getRepository(CentroDeTrabajo);
const direccionRepository = AppDataSource.getRepository(Direccion);
const contactoRepository = AppDataSource.getRepository(Contacto);

export const getAllCentrosTrabajo = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const centros = await centroTrabajoRepository.find({
            relations: ['direccion_centro', 'contacto_centro']
        });
        return res.json(centros);
    } catch (error) {
        console.error('Error al obtener centros de trabajo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getCentroTrabajoById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const centro = await centroTrabajoRepository.findOne({
            where: { id_centro: id },
            relations: ['direccion_centro', 'contacto_centro']
        });

        if (!centro) {
            return res.status(404).json({ message: 'Centro de trabajo no encontrado' });
        }

        return res.status(200).json(centro);
    } catch (error) {
        console.error('Error al obtener centro de trabajo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createCentroTrabajo = async (req: Request, res: Response): Promise<Response> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const nombre_centro = req.body.nombre_centro;
        const direccion = req.body.direccion || req.body.direccion_centro;
        const contacto = req.body.contacto || req.body.contacto_centro;

        if (!nombre_centro || !direccion || !contacto) {
            return res.status(400).json({ 
                message: 'Faltan datos requeridos',
                required: {
                    nombre_centro: 'string',
                    direccion: {
                        sector_dir: 'number (requerido)',
                        calle_dir: 'string',
                        num_res_dir: 'string'
                    },
                    contacto: {
                        telefono_contacto: 'string',
                        email_contacto: 'string'
                    }
                }
            });
        }

        // Validación de unicidad para nombre_centro
        const existeNombre = await AppDataSource.getRepository(CentroDeTrabajo).findOne({ where: { nombre_centro } });
        if (existeNombre) {
            await queryRunner.rollbackTransaction();
            return res.status(400).json({ message: 'Ya existe un centro de trabajo con ese nombre.' });
        }

        // Validación de unicidad para telefono_contacto
        const existeTelefono = await AppDataSource.getRepository(Contacto).findOne({ where: { telefono_contacto: contacto.telefono_contacto } });
        if (existeTelefono) {
            await queryRunner.rollbackTransaction();
            return res.status(400).json({ message: 'Ya existe un contacto con ese teléfono.' });
        }

        // Validación de unicidad para email_contacto
        const existeCorreo = await AppDataSource.getRepository(Contacto).findOne({ where: { email_contacto: contacto.email_contacto } });
        if (existeCorreo) {
            await queryRunner.rollbackTransaction();
            return res.status(400).json({ message: 'Ya existe un contacto con ese correo electrónico.' });
        }

        const sector = await AppDataSource.getRepository(Sector).findOne({ where: { id_sec: direccion.sector_dir } });
        if (!sector) {
            await queryRunner.rollbackTransaction();
            return res.status(400).json({ message: 'Sector no encontrado' });
        }

        const newDireccion = queryRunner.manager.create(Direccion, {
            sector_dir: sector,
            calle_dir: direccion.calle_dir,
            num_res_dir: direccion.num_res_dir,
            estado_dir: 'Activo'
        });
        const savedDireccion = await queryRunner.manager.save(Direccion, newDireccion);

        const newContacto = queryRunner.manager.create(Contacto, {
            telefono_contacto: contacto.telefono_contacto,
            email_contacto: contacto.email_contacto,
            estado_contacto: 'Activo'
        });
        const savedContacto = await queryRunner.manager.save(Contacto, newContacto);

        const newCentro = queryRunner.manager.create(CentroDeTrabajo, {
            nombre_centro,
            estado_centro: 'Activo',
            direccion_centro: savedDireccion,
            contacto_centro: savedContacto,
            usuario: req.body.id_usu ? { id_usuario: req.body.id_usu } : undefined
        });
        
        const savedCentro = await queryRunner.manager.save(CentroDeTrabajo, newCentro);
        await queryRunner.commitTransaction();

        return res.status(201).json(savedCentro);

    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error('Error al crear centro de trabajo:', error);
        return res.status(500).json({ 
            message: 'Error al crear el centro de trabajo',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    } finally {
        await queryRunner.release();
    }
};

export const updateCentroTrabajo = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const centro = await centroTrabajoRepository.findOne({
            where: { id_centro: id }
        });

        if (!centro) {
            return res.status(404).json({ message: 'Centro de trabajo no encontrado' });
        }

        centroTrabajoRepository.merge(centro, req.body);
        const updatedCentro = await centroTrabajoRepository.save(centro);
        return res.status(200).json(updatedCentro);
    } catch (error) {
        console.error('Error al actualizar centro de trabajo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteCentroTrabajo = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const result = await centroTrabajoRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Centro de trabajo no encontrado' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar centro de trabajo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getCiudadesByProvincia = async (req: Request, res: Response): Promise<Response> => {
    try {
        const provinciaId = parseInt(req.params.provinciaId);
        const ciudades = await AppDataSource
            .getRepository(Ciudad)
            .find({
                where: { provincia_ciu: provinciaId },
                relations: ['provincia']
            });
        return res.json(ciudades);
    } catch (error) {
        console.error('Error al obtener ciudades:', error);
        return res.status(500).json({ message: 'Error al obtener ciudades' });
    }
};

export const getSectoresByCiudad = async (req: Request, res: Response): Promise<Response> => {
    try {
        const ciudadId = parseInt(req.params.ciudadId);
        const sectores = await AppDataSource
            .getRepository(Sector)
            .find({
                where: { ciudad_sec: ciudadId }
            });
        return res.json(sectores);
    } catch (error) {
        console.error('Error al obtener sectores:', error);
        return res.status(500).json({ message: 'Error al obtener sectores' });
    }
};

export const existeNombreCentro = async (req: Request, res: Response): Promise<Response> => {
    const nombre = req.params.nombre;
    if (!nombre) {
        return res.status(400).json({ message: 'Nombre requerido' });
    }
    const existe = await centroTrabajoRepository.findOne({ where: { nombre_centro: nombre } });
    return res.json({ exists: !!existe });
};