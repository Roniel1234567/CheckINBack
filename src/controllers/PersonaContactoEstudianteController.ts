import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { PersonaContactoEstudiante } from '../models/PersonaContactoEstudiante';

const personaContactoRepository = AppDataSource.getRepository(PersonaContactoEstudiante);

export const getAllPersonaContactosEst = async (_req: Request, res: Response) => {
    try {
        const contactos = await personaContactoRepository.find({ relations: ['estudiante'] });
        return res.json(contactos);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los contactos de estudiante' });
    }
};

export const getPersonaContactoEstById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const contacto = await personaContactoRepository.findOne({
            where: { id_contacto_estudiante: Number(id) },
            relations: ['estudiante']
        });
        if (!contacto) return res.status(404).json({ message: 'Contacto no encontrado' });
        return res.json(contacto);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el contacto de estudiante' });
    }
};

export const createPersonaContactoEst = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        // Mapear estudiante a objeto si es id
        if (data.estudiante) {
            data.estudiante = { documento_id_est: data.estudiante };
        }
        const nuevoContacto = personaContactoRepository.create(data);
        await personaContactoRepository.save(nuevoContacto);
        return res.status(201).json(nuevoContacto);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el contacto de estudiante' });
    }
};

export const updatePersonaContactoEst = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const contacto = await personaContactoRepository.findOne({ where: { id_contacto_estudiante: Number(id) } });
        if (!contacto) return res.status(404).json({ message: 'Contacto no encontrado' });
        personaContactoRepository.merge(contacto, req.body);
        await personaContactoRepository.save(contacto);
        return res.json(contacto);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el contacto de estudiante' });
    }
};

export const deletePersonaContactoEst = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await personaContactoRepository.delete({ id_contacto_estudiante: Number(id) });
        if (result.affected === 0) return res.status(404).json({ message: 'Contacto no encontrado' });
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el contacto de estudiante' });
    }
};

export const getPersonaContactoEstByDocumento = async (req: Request, res: Response) => {
    try {
        const documento = req.params.documento;
        // Busca el contacto por el documento del estudiante
        const contacto = await personaContactoRepository.findOne({
            where: { estudiante: { documento_id_est: documento } },
            relations: ['estudiante']
        });
        if (!contacto) {
            return res.status(404).json({ message: 'No se encontró persona de contacto para este estudiante' });
        }
        return res.json(contacto);
    } catch (error) {
        return res.status(500).json({ message: 'Error al buscar el contacto por documento de estudiante' });
    }
}; 