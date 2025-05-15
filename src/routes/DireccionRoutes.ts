import { Router, Request, Response } from 'express';
import { 
    getAllDirecciones,
    getDireccionById,
    createDireccion,
    updateDireccion,
    deleteDireccion,
    getDireccionByEstudianteDocumento
} from '../controllers/DireccionController';

const router = Router();

// Get all direcciones
router.get('/', async (req: Request, res: Response) => {
    await getAllDirecciones(req, res);
});

// Get direccion by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getDireccionById(req, res);
});

// Create new direccion
router.post('/', async (req: Request, res: Response) => {
    await createDireccion(req, res);
});

// Update direccion
router.put('/:id', async (req: Request, res: Response) => {
    await updateDireccion(req, res);
});

// Delete direccion
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteDireccion(req, res);
});

// Obtener dirección completa por documento de estudiante
router.get('/estudiante/:documento', async (req: Request, res: Response) => {
    await getDireccionByEstudianteDocumento(req, res);
});

export default router;