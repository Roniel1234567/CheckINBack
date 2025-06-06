import { Router, Request, Response } from 'express';
import { sendCredencialesEmail, sendDocumentosEmail } from '../services/emailService';

const router = Router();

// Enviar credenciales por email
router.post('/credenciales', async (req: Request, res: Response) => {
    const { correoEstudiante, nombreEstudiante, usuario, contrasena } = req.body;
    
    try {
        const result = await sendCredencialesEmail(correoEstudiante, nombreEstudiante, usuario, contrasena);
        if (result.success) {
            res.json({ success: true, message: 'Email enviado correctamente' });
        } else {
            res.status(500).json({ success: false, message: 'Error al enviar el email', error: result.error });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al enviar el email', error });
    }
});

// Enviar notificación de estado de documentos
router.post('/documentos', async (req: Request, res: Response): Promise<void> => {
    const { correoEstudiante, nombreEstudiante, estado, documentosAfectados } = req.body;
    
    try {
        // Validar que todos los campos necesarios estén presentes
        if (!correoEstudiante || !nombreEstudiante || !estado || !documentosAfectados) {
            res.status(400).json({ 
                success: false, 
                message: 'Faltan campos requeridos',
                error: 'Missing required fields'
            });
            return;
        }

        // Validar el estado
        const estadosValidos = ['aprobados', 'rechazados', 'vistos', 'pendientes'];
        if (!estadosValidos.includes(estado)) {
            res.status(400).json({ 
                success: false, 
                message: 'Estado no válido',
                error: 'Invalid status'
            });
            return;
        }

        const result = await sendDocumentosEmail(
            correoEstudiante,
            nombreEstudiante,
            estado as 'aprobados' | 'rechazados' | 'vistos' | 'pendientes',
            documentosAfectados
        );

        if (result.success) {
            res.json({ success: true, message: 'Email enviado correctamente' });
        } else {
            res.status(500).json({ 
                success: false, 
                message: 'Error al enviar el email', 
                error: result.error 
            });
        }
    } catch (error) {
        console.error('Error detallado al enviar email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al enviar el email', 
            error 
        });
    }
});

export default router; 