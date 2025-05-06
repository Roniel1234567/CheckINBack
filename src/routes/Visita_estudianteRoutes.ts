import { Router, Request, Response } from 'express';
import { 
    getAllVisitasEstudiantes,
    getVisitaEstudianteById,
    createVisitaEstudiante,
    updateVisitaEstudiante,
    deleteVisitaEstudiante 
} from '../controllers/Visita_EstudianteController';

const router = Router();

// Get all visitas de estudiantes
router.get('/', async (req: Request, res: Response) => {
    await getAllVisitasEstudiantes(req, res);
});

// Get visita de estudiante by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getVisitaEstudianteById(req, res);
});

// Create new visita de estudiante
router.post('/', async (req: Request, res: Response) => {
    await createVisitaEstudiante(req, res);
});

// Update visita de estudiante
router.put('/:id', async (req: Request, res: Response) => {
    await updateVisitaEstudiante(req, res);
});

// Delete visita de estudiante
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteVisitaEstudiante(req, res);
});

export default router;