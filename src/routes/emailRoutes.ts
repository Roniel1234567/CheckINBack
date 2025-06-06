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
router.post('/documentos', async (req: Request, res: Response) => {
    const { correoEstudiante, nombreEstudiante, estado, documentosAfectados } = req.body;
    
    try {
        const result = await sendDocumentosEmail(correoEstudiante, nombreEstudiante, estado, documentosAfectados);
        if (result.success) {
            res.json({ success: true, message: 'Email enviado correctamente' });
        } else {
            res.status(500).json({ success: false, message: 'Error al enviar el email', error: result.error });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al enviar el email', error });
    }
});

export default router; 