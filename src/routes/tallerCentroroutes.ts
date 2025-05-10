import { Router, Request, Response } from 'express';
import { createTallerCentro, getCentrosPorTaller } from '../controllers/TallerCentroController';

const router = Router();

// Crear relación taller-centro
router.post('/', async (req: Request, res: Response) => {
    await createTallerCentro(req, res);
}); 

// Obtener centros por taller
router.get('/:id_taller', async (req: Request, res: Response) => {
    await getCentrosPorTaller(req, res);
});

export default router; 