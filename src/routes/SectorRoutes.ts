import { Router, Request, Response } from 'express';
import { 
    getAllSectores,
    getSectorById,
    createSector,
    updateSector,
    deleteSector 
} from '../controllers/SectorController';

const router = Router();

// Get all sectores
router.get('/', async (req: Request, res: Response) => {
    await getAllSectores(req, res);
});

// Get sector by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getSectorById(req, res);
});

// Create new sector
router.post('/', async (req: Request, res: Response) => {
    await createSector(req, res);
});

// Update sector
router.put('/:id', async (req: Request, res: Response) => {
    await updateSector(req, res);
});

// Delete sector
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteSector(req, res);
});

export default router;