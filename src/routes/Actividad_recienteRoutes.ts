import { Router, Request, Response } from 'express';
import { 
    getAllActividadesRecientes,
    getActividadRecienteById,
    createActividadReciente,
    updateActividadReciente,
    deleteActividadReciente 
} from '../controllers/ActividadRecienteController';

const router = Router();

// Get all actividades recientes
router.get('/', async (req: Request, res: Response) => {
    await getAllActividadesRecientes(req, res);
});

// Get actividad reciente by ID
router.get('/:usuario_act/:actividad/:entidad_act/:registro_act', async (req: Request, res: Response) => {
    await getActividadRecienteById(req, res);
});

// Create new actividad reciente
router.post('/', async (req: Request, res: Response) => {
    await createActividadReciente(req, res);
});

// Update actividad reciente
router.put('/:usuario_act/:actividad/:entidad_act/:registro_act', async (req: Request, res: Response) => {
    await updateActividadReciente(req, res);
});

// Delete actividad reciente

router.delete('/:usuario_act/:actividad/:entidad_act/:registro_act', async (req: Request, res: Response) => {
    await deleteActividadReciente(req, res);
});

export default router;