import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { Usuario } from '../models/User';

// Controlador de login
export const loginController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { dato_usuario, contrasena_usuario } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(Usuario);
    const user = await userRepository.findOne({ 
      where: { dato_usuario },
      relations: ['rol']
    });

    if (!user) {
      res.status(400).json({ message: 'Usuario no encontrado' });
      return;
    }

    const isMatch = await bcrypt.compare(contrasena_usuario, user.contrasena_usuario);
    if (!isMatch) {
      res.status(400).json({ message: 'Contraseña incorrecta' });
      return;
    }

    const token = jwt.sign(
      { id: user.id_usuario }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id_usuario,
        dato_usuario: user.dato_usuario,
        rol: user.rol_usuario,
        estado: user.estado_usuario
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador de registro
export const registerController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { 
    dato_usuario,
    contrasena_usuario,
    rol_usuario
  } = req.body;

  if (!dato_usuario || !contrasena_usuario || !rol_usuario) {
    res.status(400).json({ 
      message: 'Faltan campos requeridos',
      required: ['dato_usuario', 'contrasena_usuario', 'rol_usuario']
    });
    return;
  }

  try {
    const userRepository = AppDataSource.getRepository(Usuario);

    const userExists = await userRepository.findOne({ 
      where: { dato_usuario }
    });

    if (userExists) {
      res.status(400).json({ message: 'El usuario ya existe' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena_usuario, salt);

    const newUser = userRepository.create({
      dato_usuario,
      contrasena_usuario: hashedPassword,
      rol_usuario,
      estado_usuario: 'Activo'
    });

    const savedUser = await userRepository.save(newUser);

    const token = jwt.sign(
      { id: savedUser.id_usuario },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: savedUser.id_usuario,
        dato_usuario: savedUser.dato_usuario,
        rol: savedUser.rol_usuario,
        estado: savedUser.estado_usuario
      }
    });
  } catch (err) {
    console.error('Error en el registro:', err);
    res.status(500).json({ 
      message: 'Error en el servidor',
      error: err instanceof Error ? err.message : 'Error desconocido'
    });
  }
};
