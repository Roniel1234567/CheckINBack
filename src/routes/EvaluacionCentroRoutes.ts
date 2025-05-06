import { Router, Request, Response } from 'express';
import { 
    getAllEvaluacionesCentro,
    getEvaluacionCentroById,
    createEvaluacionCentro,
    updateEvaluacionCentro,
    deleteEvaluacionCentro 
} from '../controllers/Evaluacion_centro_Controller';

const router = Router();

// Get all evaluaciones centro
router.get('/', async (req: Request, res: Response) => {
    await getAllEvaluacionesCentro(req, res);
});

// Get evaluacion centro by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getEvaluacionCentroById(req, res);
});

// Create new evaluacion centro
router.post('/', async (req: Request, res: Response) => {
    await createEvaluacionCentro(req, res);
});

// Update evaluacion centro
router.put('/:id', async (req: Request, res: Response) => {
    await updateEvaluacionCentro(req, res);
});

// Delete evaluacion centro
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteEvaluacionCentro(req, res);
});

export default router;