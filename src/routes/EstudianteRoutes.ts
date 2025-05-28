import { Router, Request, Response } from 'express';
import { 
    getAllEstudiantes,
    getEstudianteById,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante,
    updateFecha,
    updateEstudiantePoliza,
    getEstudianteByUsuarioId
} from '../controllers/EstudianteController';

const router = Router();

// Ruta para obtener estudiante por id_usuario (debe ir antes de /:id)
router.get('/by-usuario/:id_usuario', async (req: Request, res: Response) => {
    await getEstudianteByUsuarioId(req, res);
});

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

// Update fecha pasantia
router.put('/fecha/:id', async (req: Request, res: Response) => {
    await updateFecha(req, res);
});

// Update poliza estudiante
router.put('/poliza/:id', async (req: Request, res: Response) => {
    await updateEstudiantePoliza(req, res);
});

export default router;