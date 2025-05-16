import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Contacto } from '../models/Contacto';

const contactoRepository = AppDataSource.getRepository(Contacto);

export const getAllContactos = async (req: Request, res: Response) => {
    try {
        const contactos = await contactoRepository.find();
        return res.json(contactos);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los contactos' });
    }
};

export const getContactoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const contacto = await contactoRepository.findOneBy({ id_contacto: parseInt(id) });
        if (!contacto) return res.status(404).json({ message: 'Contacto no encontrado' });
        return res.json(contacto);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el contacto' });
    }
};

export const createContacto = async (req: Request, res: Response) => {
    try {
        const newContacto = contactoRepository.create(req.body);
        await contactoRepository.save(newContacto);
        return res.status(201).json(newContacto);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el contacto' });
    }
};

export const updateContacto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const contacto = await contactoRepository.findOneBy({ id_contacto: parseInt(id) });
        if (!contacto) return res.status(404).json({ message: 'Contacto no encontrado' });
        
        contactoRepository.merge(contacto, req.body);
        await contactoRepository.save(contacto);
        return res.json(contacto);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el contacto' });
    }
};

export const deleteContacto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await contactoRepository.delete({ id_contacto: parseInt(id) });
        if (result.affected === 0) return res.status(404).json({ message: 'Contacto no encontrado' });
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el contacto' });
    }
};

export const existeTelefonoContacto = async (req: Request, res: Response) => {
    const telefono = req.params.telefono;
    if (!telefono) {
        return res.status(400).json({ message: 'Teléfono requerido' });
    }
    const existe = await contactoRepository.findOne({ where: { telefono_contacto: telefono } });
    return res.json({ exists: !!existe });
};

export const existeEmailContacto = async (req: Request, res: Response) => {
    const email = req.params.email;
    if (!email) {
        return res.status(400).json({ message: 'Email requerido' });
    }
    const existe = await contactoRepository.findOne({ where: { email_contacto: email } });
    return res.json({ exists: !!existe });
};