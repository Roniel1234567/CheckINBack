import { Router, Request, Response } from 'express';
import { 
    getAllVisitas,
    getVisitaById,
    createVisita,
    updateVisita,
    deleteVisita 
} from '../controllers/VisitaController';

const router = Router();

// Get all visitas
router.get('/', async (req: Request, res: Response) => {
    await getAllVisitas(req, res);
});

// Get visita by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getVisitaById(req, res);
});

// Create new visita
router.post('/', async (req: Request, res: Response) => {
    await createVisita(req, res);
});

// Update visita
router.put('/:id', async (req: Request, res: Response) => {
    await updateVisita(req, res);
});

// Delete visita
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteVisita(req, res);
});

export default router;