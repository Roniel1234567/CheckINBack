import { Router, Request, Response } from 'express';
import { 
    getAllCalificaciones,
    getCalificacionById,
    getCalificacionesByEvaluacionId,
    createCalificacion,
    updateCalificacion,
    deleteCalificacion 
} from '../controllers/CalificacionEstudianteController';

const router = Router();

// Get all calificaciones
router.get('/', async (req: Request, res: Response) => {
    await getAllCalificaciones(req, res);
});

// Get calificaciones por evaluación
router.get('/porEvaluacion/:idEvaluacion', async (req: Request, res: Response) => {
    await getCalificacionesByEvaluacionId(req, res);
});

// Get calificacion by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getCalificacionById(req, res);
});

// Create new calificacion
router.post('/', async (req: Request, res: Response) => {
    await createCalificacion(req, res);
});

// Update calificacion
router.put('/:id', async (req: Request, res: Response) => {
    await updateCalificacion(req, res);
});

// Delete calificacion
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteCalificacion(req, res);
});

export default router; 