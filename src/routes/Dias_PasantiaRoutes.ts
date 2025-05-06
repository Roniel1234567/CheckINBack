import { Router, Request, Response } from 'express';
import { 
    getAllDiasPasantia,
    getDiasPasantiaById,
    createDiasPasantia,
    updateDiasPasantia,
    deleteDiasPasantia 
} from '../controllers/Dias_PasantiaController';

const router = Router();

// Get all dias pasantia
router.get('/', async (req: Request, res: Response) => {
    await getAllDiasPasantia(req, res);
});

// Get dia pasantia by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getDiasPasantiaById(req, res);
});

// Create new dia pasantia
router.post('/', async (req: Request, res: Response) => {
    await createDiasPasantia(req, res);
});

// Update dia pasantia
router.put('/:id', async (req: Request, res: Response) => {
    await updateDiasPasantia(req, res);
});

// Delete dia pasantia
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteDiasPasantia(req, res);
});

export default router;