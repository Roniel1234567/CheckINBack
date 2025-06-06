import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configurar el transporter de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ronielrodriguezcolon@gmail.com',
        pass: 'xevs vnzj zdxi nkuq' // Contraseña de aplicación de Google
    }
});

// Plantillas de correo
const emailTemplates = {
    empresaAceptada: (nombreEmpresa: string) => ({
        subject: '¡Felicitaciones! Su empresa ha sido aceptada en CHECKINTIN',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #1a237e;">¡Felicitaciones ${nombreEmpresa}! 🎉</h2>
                
                <p>Nos complace informarle que su empresa ha sido <strong style="color: #4caf50;">ACEPTADA</strong> 
                en el proceso de pasantías del Instituto Politécnico Industrial de Santiago (IPISA).</p>
                
                <p>A través de nuestra plataforma CHECKINTIN, ahora puede:</p>
                <ul>
                    <li>Gestionar plazas de pasantías</li>
                    <li>Supervisar el progreso de los pasantes</li>
                    <li>Mantener comunicación directa con la institución</li>
                    <li>Contribuir a la formación profesional de nuestros estudiantes</li>
                </ul>

                <p>Le invitamos a acceder a CHECKINTIN para comenzar a gestionar sus plazas 
                y ser parte de esta importante etapa en la formación de futuros profesionales.</p>

                <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
                    <p style="margin: 0;">¡Gracias por ser parte de nuestra red de empresas colaboradoras!</p>
                </div>
            </div>
        `
    }),
    empresaRechazada: (nombreEmpresa: string) => ({
        subject: 'Resultado de evaluación en CHECKINTIN',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #1a237e;">Notificación Importante</h2>
                
                <p>Estimados representantes de ${nombreEmpresa},</p>

                <p>Agradecemos su interés en formar parte del programa de pasantías del 
                Instituto Politécnico Industrial de Santiago (IPISA).</p>

                <p>Después de una cuidadosa evaluación, lamentamos informarle que en este momento 
                su empresa no cumple con los requisitos mínimos establecidos para participar 
                en nuestro programa de pasantías.</p>

                <p>Le invitamos a:</p>
                <ul>
                    <li>Revisar nuestros requisitos y criterios de evaluación</li>
                    <li>Realizar las adecuaciones necesarias</li>
                    <li>Presentar una nueva solicitud en el futuro</li>
                </ul>

                <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
                    <p style="margin: 0;">Si tiene alguna duda o desea más información sobre los requisitos, 
                    no dude en contactarnos.</p>
                </div>
            </div>
        `
    })
};

export const sendValidacionEmail = async (
    emailDestino: string,
    nombreEmpresa: string,
    esAceptada: boolean
): Promise<{ success: boolean; error?: any }> => {
    try {
        console.log('Iniciando envío de email de validación:', {
            emailDestino,
            nombreEmpresa,
            esAceptada
        });

        const template = esAceptada 
            ? emailTemplates.empresaAceptada(nombreEmpresa)
            : emailTemplates.empresaRechazada(nombreEmpresa);

        const mailOptions = {
            from: '"CHECKINTIN - IPISA" <ronielrodriguezcolon@gmail.com>',
            to: emailDestino,
            subject: template.subject,
            html: template.html
        };

        console.log('Intentando enviar email con opciones:', mailOptions);

        const info = await transporter.sendMail(mailOptions);
        console.log('Email de validación enviado exitosamente:', info);

        return { success: true };
    } catch (error) {
        const err = error as Error;
        console.error('Error detallado al enviar el email de validación:', {
            message: err.message || 'Error desconocido',
            stack: err.stack || 'No stack trace disponible',
            code: (error as any).code || 'No error code',
            response: (error as any).response || 'No response data'
        });
        return { 
            success: false, 
            error: err.message || 'Error al enviar el email de validación'
        };
    }
};

export const sendPasswordResetEmail = async (to: string, resetToken: string): Promise<boolean> => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
    
    const mailOptions = {
      from: 'Sistema de Pasantías <ronielrodriguezcolon@gmail.com>',
      to,
      subject: 'Recuperación de contraseña',
      html: `
        <h1>Recuperación de contraseña</h1>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Restablecer contraseña</a>
        <p>Este enlace expirará en 1 hora.</p>
        <p>Si no solicitaste un cambio de contraseña, por favor ignora este correo.</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.response);
    return true;
  } catch (error) {
    console.error('Error al enviar el email:', error);
    return false;
  }
};

// Notificar al estudiante sobre el estado de sus documentos
export const sendDocumentosEmail = async (
    correoEstudiante: string,
    nombreEstudiante: string,
    estado: 'aprobados' | 'rechazados' | 'vistos' | 'pendientes',
    documentosAfectados: string[]
): Promise<{ success: boolean; error?: any }> => {
    try {
        console.log('Iniciando envío de email con datos:', {
            correoEstudiante,
            nombreEstudiante,
            estado,
            documentosAfectados
        });

        let estadoTexto = '';
        let color = '#2196F3';
        
        if (estado === 'aprobados') {
            estadoTexto = 'aprobados';
            color = '#4CAF50';
        } else if (estado === 'rechazados') {
            estadoTexto = 'rechazados';
            color = '#F44336';
        } else if (estado === 'pendientes') {
            estadoTexto = 'pendientes';
            color = '#FF9800';
        } else {
            estadoTexto = 'vistos';
            color = '#2196F3';
        }

        const mailOptions = {
            from: 'Sistema de Pasantías <ronielrodriguezcolon@gmail.com>',
            to: correoEstudiante,
            subject: `Documentos ${estadoTexto} - CHECKINTIN`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: ${color};">¡Hola, ${nombreEstudiante}!</h2>
                    <p>Te informamos que los siguientes documentos han sido marcados como <strong style="color: ${color}; text-transform: uppercase;">${estadoTexto}</strong>:</p>
                    <ul>
                        ${documentosAfectados.map(doc => `<li>${doc}</li>`).join('')}
                    </ul>
                    <p>Por favor, revisa la plataforma para más detalles.</p>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
                        <p style="margin: 0;">Este es un mensaje automático de CHECKINTIN - IPISA.</p>
                    </div>
                </div>
            `
        };

        console.log('Intentando enviar email con opciones:', mailOptions);

        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado exitosamente:', info);
        
        return { success: true };
    } catch (error) {
        const err = error as Error;
        console.error('Error detallado al enviar el email de documentos:', {
            message: err.message || 'Error desconocido',
            stack: err.stack || 'No stack trace disponible',
            code: (error as any).code || 'No error code',
            response: (error as any).response || 'No response data'
        });
        return { 
            success: false, 
            error: err.message || 'Error al enviar el email de documentos'
        };
    }
};

export const sendComentarioEmail = async (
    correoEstudiante: string,
    nombreEstudiante: string,
    nombreDocumento: string,
    comentario: string
): Promise<{ success: boolean; error?: any }> => {
    try {
        const mailOptions = {
            from: 'Sistema de Pasantías <ronielrodriguezcolon@gmail.com>',
            to: correoEstudiante,
            subject: `Nuevo comentario sobre tu documento - ${nombreDocumento}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #1a237e;">¡Hola, ${nombreEstudiante}!</h2>
                    <p>Has recibido un nuevo comentario sobre tu documento: <strong>${nombreDocumento}</strong></p>
                    
                    <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
                        <p style="margin: 0;"><strong>Comentario:</strong></p>
                        <p style="margin: 10px 0;">${comentario}</p>
                    </div>

                    <p>Por favor, revisa la plataforma para más detalles.</p>
                    
                    <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
                        <p style="margin: 0;">Este es un mensaje automático de CHECKINTIN - IPISA.</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Error al enviar el email de comentario:', error);
        return { success: false, error };
    }
};

// Plantilla para email de credenciales
const credencialesTemplate = (nombreEstudiante: string, usuario: string, contrasena: string) => ({
    subject: 'Bienvenido a CHECKINTIN - Tus credenciales de acceso',
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #1a237e;">¡Bienvenido a CHECKINTIN, ${nombreEstudiante}! 🎉</h2>
            
            <p>Tu cuenta ha sido creada exitosamente en el sistema de pasantías del Instituto Politécnico Industrial de Santiago (IPISA).</p>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
                <p style="margin: 5px 0;"><strong>Tus credenciales de acceso son:</strong></p>
                <p style="margin: 5px 0;">Usuario: <strong>${usuario}</strong></p>
                <p style="margin: 5px 0;">Contraseña: <strong>${contrasena}</strong></p>
            </div>

            <p>Por favor, ingresa a la plataforma y cambia tu contraseña por una de tu preferencia.</p>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
                <p style="margin: 0;">Este es un mensaje automático de CHECKINTIN - IPISA.</p>
                <p style="margin: 5px 0; color: #666;">Por favor, no respondas a este correo.</p>
            </div>
        </div>
    `
});

export const sendCredencialesEmail = async (
    correoEstudiante: string,
    nombreEstudiante: string,
    usuario: string,
    contrasena: string
) => {
    try {
        const template = credencialesTemplate(nombreEstudiante, usuario, contrasena);

        await transporter.sendMail({
            from: '"CHECKINTIN - IPISA" <ronielrodriguezcolon@gmail.com>',
            to: correoEstudiante,
            subject: template.subject,
            html: template.html
        });

        return { success: true };
    } catch (error) {
        console.error('Error enviando email de credenciales:', error);
        return { success: false, error };
    }
}; 