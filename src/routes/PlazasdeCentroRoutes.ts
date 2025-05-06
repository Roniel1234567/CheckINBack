import { Router, Request, Response } from 'express';
import { 
    getAllPlazas,
    getPlazaById,
    createPlaza,
    updatePlaza,
    deletePlaza 
} from '../controllers/PlazasController';

const router = Router();

// Get all plazas
router.get('/', async (req: Request, res: Response) => {
    await getAllPlazas(req, res);
});

// Get plaza by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getPlazaById(req, res);
});

// Create new plaza
router.post('/', async (req: Request, res: Response) => {
    await createPlaza(req, res);
});

// Update plaza
router.put('/:id', async (req: Request, res: Response) => {
    await updatePlaza(req, res);
});

// Delete plaza
router.delete('/:id', async (req: Request, res: Response) => {
    await deletePlaza(req, res);
});

export default router;