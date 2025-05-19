import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { AppDataSource } from '../data-source';
import { Usuario } from '../models/User';
import { sendPasswordResetEmail } from '../services/emailService';

// Controlador de login
export const loginController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { dato_usuario, contrasena_usuario, email } = req.body;
  let loginIdentifier = dato_usuario;

  try {
    const userRepository = AppDataSource.getRepository(Usuario);
    let user = null;
    
    // Si proporcionaron un email específicamente o el dato_usuario parece ser un email
    if (email || (loginIdentifier && loginIdentifier.includes('@'))) {
      const emailToCheck = email || loginIdentifier;
      
      // Primero buscar en la tabla usuario por email
      user = await userRepository.findOne({ 
        where: { email_usuario: emailToCheck },
        relations: ['rol']
      });
      
      // Si no lo encuentra, buscar en estudiantes con contacto que tenga ese email
      if (!user) {
        const estudiantesQuery = `
          SELECT u.* FROM usuario u
          INNER JOIN estudiante e ON e.usuario_est = u.id_usu
          INNER JOIN contacto c ON e.contacto_est = c.id_contacto
          WHERE c.email_contacto = $1
        `;
        
        const estudiantes = await AppDataSource.query(estudiantesQuery, [emailToCheck]);
        
        if (estudiantes && estudiantes.length > 0) {
          user = await userRepository.findOne({
            where: { id_usuario: estudiantes[0].id_usu },
            relations: ['rol']
          });
        } else {
          // Buscar en centros de trabajo
          const centrosQuery = `
            SELECT u.* FROM usuario u
            INNER JOIN centro_trabajo ct ON ct.id_usu = u.id_usu
            INNER JOIN contacto c ON ct.contacto_centro = c.id_contacto
            WHERE c.email_contacto = $1
          `;
          
          const centros = await AppDataSource.query(centrosQuery, [emailToCheck]);
          
          if (centros && centros.length > 0) {
            user = await userRepository.findOne({
              where: { id_usuario: centros[0].id_usu },
              relations: ['rol']
            });
          }
        }
      }
    } 
    // Búsqueda por nombre de usuario
    else {
      user = await userRepository.findOne({ 
        where: { dato_usuario: loginIdentifier },
        relations: ['rol']
      });
    }

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
    rol_usuario,
    email_usuario
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
      estado_usuario: 'Activo',
      email_usuario
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

// Controlador para solicitar recuperación de contraseña
export const forgotPasswordController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, usuario } = req.body;

  if (!email && !usuario) {
    res.status(400).json({ message: 'Se requiere correo electrónico o nombre de usuario' });
    return;
  }

  try {
    const userRepository = AppDataSource.getRepository(Usuario);
    let user: Usuario | null = null;
    let emailToSend: string | undefined = undefined;
    
    // Si proporcionan el usuario directamente
    if (usuario) {
      user = await userRepository.findOne({ 
        where: { dato_usuario: usuario } 
      });
      
      // Si encontramos el usuario por su nombre de usuario y tiene email
      if (user && user.email_usuario) {
        emailToSend = user.email_usuario;
      }
    } 
    // Si proporcionan el email, buscamos primero en usuario
    else if (email) {
      emailToSend = email;
      user = await userRepository.findOne({ 
        where: { email_usuario: email } 
      });
      
      // Si no lo encontramos con email en usuario, buscamos en las tablas relacionadas con contacto
      if (!user) {
        try {
          // Buscar en Estudiante con su usuario asociado - usando consulta SQL directa
          const estudiantesQuery = `
            SELECT u.* FROM usuario u
            INNER JOIN estudiante e ON e.usuario_est = u.id_usu
            INNER JOIN contacto c ON e.contacto_est = c.id_contacto
            WHERE c.email_contacto = $1
          `;
          
          const estudiantesResult = await AppDataSource.query(estudiantesQuery, [email]);
          
          if (estudiantesResult && estudiantesResult.length > 0) {
            // Encontramos un usuario a través de estudiante
            user = await userRepository.findOne({
              where: { id_usuario: estudiantesResult[0].id_usu }
            });
          } else {
            // Buscar en Centro de Trabajo con SQL directo
            const centrosQuery = `
              SELECT u.* FROM usuario u
              INNER JOIN centro_trabajo ct ON ct.id_usu = u.id_usu
              INNER JOIN contacto c ON ct.contacto_centro = c.id_contacto
              WHERE c.email_contacto = $1
            `;
            
            const centrosResult = await AppDataSource.query(centrosQuery, [email]);
            
            if (centrosResult && centrosResult.length > 0) {
              // Encontramos un usuario a través de centro de trabajo
              user = await userRepository.findOne({
                where: { id_usuario: centrosResult[0].id_usu }
              });
            }
          }
        } catch (err) {
          console.error('Error al buscar usuario por email en contacto:', err);
        }
      }
    }

    // Si no encontramos un usuario válido
    if (!user) {
      // Por seguridad, no informamos si el correo existe o no
      res.status(200).json({ message: 'Si el correo existe, recibirás un enlace para restablecer tu contraseña' });
      return;
    }

    // Asegurarse de tener un correo electrónico donde enviar el reset
    if (!emailToSend) {
      emailToSend = email;
      
      // Si aún así no tenemos email, es un error
      if (!emailToSend) {
        res.status(400).json({ message: 'No se encontró un correo electrónico asociado a esta cuenta' });
        return;
      }
    }

    // Generar token aleatorio
    const resetToken = crypto.randomBytes(32).toString('hex');
    // El token expira en 1 hora
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);

    // Actualizar usuario con el token
    user.resetToken = resetToken;
    user.resetTokenExpiry = expiry;
    await userRepository.save(user);

    // Enviar correo electrónico
    const emailSent = await sendPasswordResetEmail(emailToSend, resetToken);

    if (!emailSent) {
      res.status(500).json({ message: 'Error al enviar el correo electrónico' });
      return;
    }

    res.status(200).json({ message: 'Si el correo existe, recibirás un enlace para restablecer tu contraseña' });
  } catch (err) {
    console.error('Error en la recuperación de contraseña:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador para restablecer contraseña
export const resetPasswordController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    res.status(400).json({ message: 'El token y la nueva contraseña son requeridos' });
    return;
  }

  try {
    const userRepository = AppDataSource.getRepository(Usuario);
    const user = await userRepository.findOne({ 
      where: { resetToken: token }
    });

    if (!user || !user.resetTokenExpiry) {
      res.status(400).json({ message: 'Token inválido o expirado' });
      return;
    }

    // Verificar si el token ha expirado
    if (new Date() > user.resetTokenExpiry) {
      res.status(400).json({ message: 'El token ha expirado' });
      return;
    }

    // Cifrar la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar contraseña y limpiar el token
    user.contrasena_usuario = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await userRepository.save(user);

    res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
  } catch (err) {
    console.error('Error al restablecer la contraseña:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
