import { Router, Request, Response } from 'express';
import { 
    getAllCiclosEscolares,
    getCicloEscolarById,
    createCicloEscolar,
    updateCicloEscolar,
    deleteCicloEscolar 
} from '../controllers/CicloEscolarController';

const router = Router();

// Get all ciclos escolares
router.get('/', async (req: Request, res: Response) => {
    await getAllCiclosEscolares(req, res);
});

// Get ciclo escolar by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getCicloEscolarById(req, res);
});

// Create new ciclo escolar
router.post('/', async (req: Request, res: Response) => {
    await createCicloEscolar(req, res);
});

// Update ciclo escolar
router.put('/:id', async (req: Request, res: Response) => {
    await updateCicloEscolar(req, res);
});

// Delete ciclo escolar
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteCicloEscolar(req, res);
});

export default router;