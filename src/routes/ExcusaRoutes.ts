import { Router, Request, Response } from 'express';
import { 
    getAllExcusas,
    getExcusaById,
    createExcusa,
    updateExcusa,
    deleteExcusa 
} from '../controllers/ExcusaController';

const router = Router();

// Get all excusas
router.get('/', async (req: Request, res: Response) => {
    await getAllExcusas(req, res);
});

// Get excusa by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getExcusaById(req, res);
});

// Create new excusa
router.post('/', async (req: Request, res: Response) => {
    await createExcusa(req, res);
});

// Update excusa
router.put('/:id', async (req: Request, res: Response) => {
    await updateExcusa(req, res);
});

// Delete excusa
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteExcusa(req, res);
});

export default router;