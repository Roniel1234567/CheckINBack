import { Router, Request, Response } from 'express';
import { 
    getAllFamiliasProfesionales,
    getFamiliaProfesionalById,
    createFamiliaProfesional,
    updateFamiliaProfesional,
    deleteFamiliaProfesional 
} from '../controllers/Familia_profesional_Controller';

const router = Router();

// Get all familias profesionales
router.get('/', async (req: Request, res: Response) => {
    await getAllFamiliasProfesionales(req, res);
});

// Get familia profesional by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getFamiliaProfesionalById(req, res);
});

// Create new familia profesional
router.post('/', async (req: Request, res: Response) => {
    await createFamiliaProfesional(req, res);
});

// Update familia profesional
router.put('/:id', async (req: Request, res: Response) => {
    await updateFamiliaProfesional(req, res);
});

// Delete familia profesional
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteFamiliaProfesional(req, res);
});

export default router;