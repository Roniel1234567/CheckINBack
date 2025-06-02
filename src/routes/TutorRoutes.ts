import { Router, Request, Response } from 'express';
import { 
    getAllTutores,
    getTutorById,
    createTutor,
    updateTutor,
    deleteTutor,
    getTutorByUsuario,
    getTutoresByTaller
} from '../controllers/TutorController';

const router = Router();

// Get all tutores
router.get('/', async (req: Request, res: Response) => {
    await getAllTutores(req, res);
});

// Get tutor by usuario (id_usuario)
router.get('/usuario/:id_usuario', async (req: Request, res: Response) => {
    await getTutorByUsuario(req, res);
});

// Get tutor by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getTutorById(req, res);
});

// Create new tutor
router.post('/', async (req: Request, res: Response) => {
    await createTutor(req, res);
});

// Update tutor
router.put('/:id', async (req: Request, res: Response) => {
    await updateTutor(req, res);
});

// Delete tutor
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteTutor(req, res);
});

// Endpoint para obtener tutores por taller
router.get('/taller/:id_taller', async (req: Request, res: Response) => {
    await getTutoresByTaller(req, res);
});

export default router;