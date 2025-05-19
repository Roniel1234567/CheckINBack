import { Router, Request, Response } from 'express';
import {
    getAllPolizas,
    getPolizaById,
    createPoliza,
    updatePoliza,
    deletePoliza
} from '../controllers/PolizaController';

const router = Router();

// Obtener todas las pólizas
router.get('/', async (req: Request, res: Response) => {
    await getAllPolizas(req, res);
});

// Obtener póliza por ID
router.get('/:id', async (req: Request, res: Response) => {
    await getPolizaById(req, res);
});

// Crear nueva póliza
router.post('/', async (req: Request, res: Response) => {
    await createPoliza(req, res);
});

// Actualizar póliza
router.put('/:id', async (req: Request, res: Response) => {
    await updatePoliza(req, res);
});

// Eliminar póliza
router.delete('/:id', async (req: Request, res: Response) => {
    await deletePoliza(req, res);
});

export default router; 