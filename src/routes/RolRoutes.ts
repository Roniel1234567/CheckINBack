import { Router, Request, Response } from 'express';
import { 
    getAllRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol 
} from '../controllers/RolController';

const router = Router();

// Get all roles
router.get('/', async (req: Request, res: Response) => {
    await getAllRoles(req, res);
});

// Get role by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getRolById(req, res);
});

// Create new role
router.post('/', async (req: Request, res: Response) => {
    await createRol(req, res);
});

// Update role
router.put('/:id', async (req: Request, res: Response) => {
    await updateRol(req, res);
});

// Delete role
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteRol(req, res);
});

export default router;