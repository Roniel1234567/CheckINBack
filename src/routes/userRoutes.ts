import { Router, Request, Response } from 'express';
import { 
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userController';

const router = Router();

// Get all users
router.get('/', async (req: Request, res: Response) => {
    await getAllUsers(req, res);
});

// Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getUserById(req, res);
});

// Create new user
router.post('/', async (req: Request, res: Response) => {
    await createUser(req, res);
});

// Update user
router.put('/:id', async (req: Request, res: Response) => {
    await updateUser(req, res);
});

// Delete user
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteUser(req, res);
});

export default router;