import { Router, Request, Response } from 'express';
import { 
    getAllSupervisores,
    getSupervisorById,
    createSupervisor,
    updateSupervisor,
    deleteSupervisor,
    getSupervisoresPorCentro,
    updateSupervisorEstado 
} from '../controllers/SupervisorController';

const router = Router();

// Get all supervisores
router.get('/', async (req: Request, res: Response) => {
    await getAllSupervisores(req, res);
});

// Get supervisores por centro de trabajo
router.get('/porCentro/:idCentro', async (req: Request, res: Response) => {
    await getSupervisoresPorCentro(req, res);
});

// Get supervisor by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getSupervisorById(req, res);
});

// Create new supervisor
router.post('/', async (req: Request, res: Response) => {
    await createSupervisor(req, res);
});

// Update supervisor
router.put('/:id', async (req: Request, res: Response) => {
    await updateSupervisor(req, res);
});

// Update only supervisor estado
router.patch('/:id/estado', async (req: Request, res: Response) => {
    await updateSupervisorEstado(req, res);
});

// Delete supervisor
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteSupervisor(req, res);
});

export default router;