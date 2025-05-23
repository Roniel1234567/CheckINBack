import { Router, Request, Response } from 'express';
import { 
    getAllEstudiantes,
    getEstudianteById,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante 
} from '../controllers/EstudianteController';

const router = Router();

// Get all estudiantes
router.get('/', async (req: Request, res: Response) => {
    await getAllEstudiantes(req, res);
});

// Get estudiante by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getEstudianteById(req, res);
});

// Create new estudiante
router.post('/', async (req: Request, res: Response) => {
    await createEstudiante(req, res);
});

// Update estudiante
router.put('/:id', async (req: Request, res: Response) => {
    await updateEstudiante(req, res);
});

// Delete estudiante
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteEstudiante(req, res);
});

export default router;