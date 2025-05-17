import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { PersonaContactoEmpresa } from '../models/PersonaContactoEmpresa';

const personaContactoRepository = AppDataSource.getRepository(PersonaContactoEmpresa);

export const getAllPersonaContactos = async (_req: Request, res: Response) => {
    try {
        const contactos = await personaContactoRepository.find({ relations: ['centro_trabajo'] });
        return res.json(contactos);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los contactos de persona' });
    }
};

export const getPersonaContactoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const contacto = await personaContactoRepository.findOne({
            where: { id_persona_contacto: Number(id) },
            relations: ['centro_trabajo']
        });
        if (!contacto) return res.status(404).json({ message: 'Contacto no encontrado' });
        return res.json(contacto);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el contacto de persona' });
    }
};

export const createPersonaContacto = async (req: Request, res: Response) => {
    console.log('BODY RECIBIDO:', req.body);
    try {
        const data = req.body;
        // Mapear centro_trabajo a objeto si es id
        if (data.centro_trabajo) {
            data.centro_trabajo = { id_centro: data.centro_trabajo };
        }
        const nuevoContacto = personaContactoRepository.create(data);
        await personaContactoRepository.save(nuevoContacto);
        return res.status(201).json(nuevoContacto);
    } catch (error) {
        console.error('ERROR AL CREAR PERSONA CONTACTO:', error);
        return res.status(500).json({ message: 'Error al crear el contacto de persona', error: error instanceof Error ? error.message : error });
    }
};

export const updatePersonaContacto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const contacto = await personaContactoRepository.findOne({ where: { id_persona_contacto: Number(id) } });
        if (!contacto) return res.status(404).json({ message: 'Contacto no encontrado' });
        personaContactoRepository.merge(contacto, req.body);
        await personaContactoRepository.save(contacto);
        return res.json(contacto);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el contacto de persona' });
    }
};

export const deletePersonaContacto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await personaContactoRepository.delete({ id_persona_contacto: Number(id) });
        if (result.affected === 0) return res.status(404).json({ message: 'Contacto no encontrado' });
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el contacto de persona' });
    }
}; 