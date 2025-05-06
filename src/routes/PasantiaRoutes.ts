import { Router, Request, Response } from 'express';
import { 
    getAllPasantias,
    getPasantiaById,
    createPasantia,
    updatePasantia,
    deletePasantia 
} from '../controllers/PasantiaController';

const router = Router();

// Get all pasantias
router.get('/', async (req: Request, res: Response) => {
    await getAllPasantias(req, res);
});

// Get pasantia by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getPasantiaById(req, res);
});

// Create new pasantia
router.post('/', async (req: Request, res: Response) => {
    await createPasantia(req, res);
});

// Update pasantia
router.put('/:id', async (req: Request, res: Response) => {
    await updatePasantia(req, res);
});

// Delete pasantia
router.delete('/:id', async (req: Request, res: Response) => {
    await deletePasantia(req, res);
});

export default router;