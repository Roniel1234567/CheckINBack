import { Router, Request, Response } from 'express';
import { 
    getAllAsistenciasPasantia,
    getAsistenciaPasantiaById,
    createAsistenciaPasantia,
    updateAsistenciaPasantia,
    deleteAsistenciaPasantia 
} from '../controllers/AsistenciaPasantiacontroller';

const router = Router();

// Get all asistencias de pasantía
router.get('/', async (req: Request, res: Response) => {
    await getAllAsistenciasPasantia(req, res);
});

// Get asistencia de pasantía by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getAsistenciaPasantiaById(req, res);
});

// Create new asistencia de pasantía
router.post('/', async (req: Request, res: Response) => {
    await createAsistenciaPasantia(req, res);
});

// Update asistencia de pasantía
router.put('/:id', async (req: Request, res: Response) => {
    await updateAsistenciaPasantia(req, res);
});

// Delete asistencia de pasantía
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteAsistenciaPasantia(req, res);
});

export default router;