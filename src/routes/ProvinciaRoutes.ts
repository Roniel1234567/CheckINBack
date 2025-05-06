import { Router, Request, Response } from 'express';
import { 
    getAllProvincias,
    getProvinciaById,
    createProvincia,
    updateProvincia,
    deleteProvincia 
} from '../controllers/ProvinciaController';

const router = Router();

// Get all provincias
router.get('/', async (req: Request, res: Response) => {
    await getAllProvincias(req, res);
});

// Get provincia by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getProvinciaById(req, res);
});

// Create new provincia
router.post('/', async (req: Request, res: Response) => {
    await createProvincia(req, res);
});

// Update provincia
router.put('/:id', async (req: Request, res: Response) => {
    await updateProvincia(req, res);
});

// Delete provincia
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteProvincia(req, res);
});

export default router;