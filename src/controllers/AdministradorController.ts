import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Administrador } from '../models/Administrador';
import { Usuario } from '../models/User';
import { Contacto } from '../models/Contacto';

const administradorRepository = AppDataSource.getRepository(Administrador);
const usuarioRepository = AppDataSource.getRepository(Usuario);
const contactoRepository = AppDataSource.getRepository(Contacto);

export const getAllAdministradores = async (_req: Request, res: Response): Promise<void> => {
    try {
        const administradores = await administradorRepository.find({
            relations: ['usuario_adm', 'contacto_adm']
        });
        res.status(200).json(administradores);
    } catch (error) {
        console.error('Error al obtener administradores:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getAdministradorById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: 'ID inválido' });
            return;
        }

        const administrador = await administradorRepository.findOne({
            where: { id_adm: id },
            relations: ['usuario_adm', 'contacto_adm']
        });

        if (!administrador) {
            res.status(404).json({ message: 'Administrador no encontrado' });
            return;
        }

        res.json(administrador);
    } catch (error) {
        console.error('Error al obtener administrador:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createAdministrador = async (req: Request, res: Response): Promise<void> => {
    try {
        const { usuario_adm, nombre_adm, apellido_adm, puesto_adm, contacto_adm } = req.body;

        // Verificar que exista el usuario
        const usuario = await usuarioRepository.findOne({
            where: { id_usuario: usuario_adm }
        });
        if (!usuario) {
            res.status(400).json({ message: 'Usuario no encontrado' });
            return;
        }

        // Verificar que exista el contacto
        const contacto = await contactoRepository.findOne({
            where: { id_contacto: contacto_adm }
        });
        if (!contacto) {
            res.status(400).json({ message: 'Contacto no encontrado' });
            return;
        }

        const newAdministrador = administradorRepository.create({
            usuario_adm: usuario,
            nombre_adm,
            apellido_adm,
            puesto_adm,
            contacto_adm: contacto
        });

        const savedAdministrador = await administradorRepository.save(newAdministrador);
        res.status(201).json(savedAdministrador);
    } catch (error) {
        console.error('Error al crear administrador:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateAdministrador = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: 'ID inválido' });
            return;
        }

        const administrador = await administradorRepository.findOne({
            where: { id_adm: id }
        });

        if (!administrador) {
            res.status(404).json({ message: 'Administrador no encontrado' });
            return;
        }

        if (req.body.usuario_adm) {
            const usuario = await usuarioRepository.findOne({
                where: { id_usuario: req.body.usuario_adm }
            });
            if (!usuario) {
                res.status(400).json({ message: 'Usuario no encontrado' });
                return;
            }
            administrador.usuario_adm = usuario;
        }

        if (req.body.contacto_adm) {
            const contacto = await contactoRepository.findOne({
                where: { id_contacto: req.body.contacto_adm }
            });
            if (!contacto) {
                res.status(400).json({ message: 'Contacto no encontrado' });
                return;
            }
            administrador.contacto_adm = contacto;
        }

        administrador.nombre_adm = req.body.nombre_adm || administrador.nombre_adm;
        administrador.apellido_adm = req.body.apellido_adm || administrador.apellido_adm;
        administrador.puesto_adm = req.body.puesto_adm || administrador.puesto_adm;

        const updatedAdministrador = await administradorRepository.save(administrador);
        res.json(updatedAdministrador);
    } catch (error) {
        console.error('Error al actualizar administrador:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteAdministrador = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: 'ID inválido' });
            return;
        }

        const result = await administradorRepository.delete(id);
        
        if (result.affected === 0) {
            res.status(404).json({ message: 'Administrador no encontrado' });
            return;
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar administrador:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}; 