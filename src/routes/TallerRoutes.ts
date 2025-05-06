import { Router, Request, Response } from 'express';
import { 
    getAllTalleres,
    getTallerById,
    createTaller,
    updateTaller,
    deleteTaller 
} from '../controllers/TallerController';

const router = Router();

// Get all talleres
router.get('/', async (req: Request, res: Response) => {
    await getAllTalleres(req, res);
});

// Get taller by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getTallerById(req, res);
});

// Create new taller
router.post('/', async (req: Request, res: Response) => {
    await createTaller(req, res);
});

// Update taller
router.put('/:id', async (req: Request, res: Response) => {
    await updateTaller(req, res);
});

// Delete taller
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteTaller(req, res);
});

export default router;