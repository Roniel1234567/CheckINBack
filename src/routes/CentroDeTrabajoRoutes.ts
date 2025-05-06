import { Router, Request, Response } from 'express';
import { 
    getAllCentrosTrabajo,
    createCentroTrabajo,
    getCiudadesByProvincia,
    getSectoresByCiudad
} from '../controllers/CentroDeTrabajoController';

const router = Router();

// Get all centros de trabajo
router.get('/', async (req: Request, res: Response) => {
    await getAllCentrosTrabajo(req, res);
});

// Create new centro de trabajo
router.post('/', async (req: Request, res: Response) => {
    await createCentroTrabajo(req, res);
});

// Get ciudades by provincia
router.get('/ciudades/provincia/:provinciaId', async (req: Request, res: Response) => {
    await getCiudadesByProvincia(req, res);
});

// Get sectores by ciudad
router.get('/sectores/ciudad/:ciudadId', async (req: Request, res: Response) => {
    await getSectoresByCiudad(req, res);
});

export default router;