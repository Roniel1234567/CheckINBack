import { Router, Request, Response } from 'express';
import { 
    getAllEvaluacionesEstudiante,
    getEvaluacionEstudianteById,
    createEvaluacionEstudiante,
    updateEvaluacionEstudiante,
    deleteEvaluacionEstudiante,
    getEvaluacionesByEstudiante 
} from '../controllers/Evaluacion_EstudianteController';

const router = Router();

// Get all evaluaciones estudiante
router.get('/', async (req: Request, res: Response) => {
    await getAllEvaluacionesEstudiante(req, res);
});

// Get evaluaciones por estudiante
router.get('/porEstudiante/:documentoId', async (req: Request, res: Response) => {
    await getEvaluacionesByEstudiante(req, res);
});

// Get evaluacion estudiante by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getEvaluacionEstudianteById(req, res);
});

// Create new evaluacion estudiante
router.post('/', async (req: Request, res: Response) => {
    await createEvaluacionEstudiante(req, res);
});

// Update evaluacion estudiante
router.put('/:id', async (req: Request, res: Response) => {
    await updateEvaluacionEstudiante(req, res);
});

// Delete evaluacion estudiante
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteEvaluacionEstudiante(req, res);
});

export default router;