import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Usuario } from '../models/User';
import bcrypt from 'bcryptjs';

const userRepository = AppDataSource.getRepository(Usuario);

export const getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const users = await userRepository.find({
            relations: ['rol']
        });
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const user = await userRepository.findOne({
            where: { id_usuario: id },
            relations: ['rol']
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { contrasena_usuario, ...restOfUser } = req.body;
        
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasena_usuario, salt);

        const newUser = userRepository.create({
            ...restOfUser,
            contrasena_usuario: hashedPassword,
            estado_usuario: 'Activo'
        });

        const savedUser = await userRepository.save(newUser);
        return res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const user = await userRepository.findOne({
            where: { id_usuario: id }
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // If password is being updated, hash it
        if (req.body.contrasena_usuario) {
            const salt = await bcrypt.genSalt(10);
            req.body.contrasena_usuario = await bcrypt.hash(req.body.contrasena_usuario, salt);
        }

        userRepository.merge(user, req.body);
        const updatedUser = await userRepository.save(user);
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const result = await userRepository.delete(id);
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};