import { Router, Request, Response } from 'express';
import { 
    getAllContactos,
    getContactoById,
    createContacto,
    updateContacto,
    deleteContacto 
} from '../controllers/ContactoControllers';

const router = Router();

// Get all contactos
router.get('/', async (req: Request, res: Response) => {
    await getAllContactos(req, res);
});

// Get contacto by ID
router.get('/:id', async (req: Request, res: Response) => {
    await getContactoById(req, res);
});

// Create new contacto
router.post('/', async (req: Request, res: Response) => {
    await createContacto(req, res);
});

// Update contacto
router.put('/:id', async (req: Request, res: Response) => {
    await updateContacto(req, res);
});

// Delete contacto
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteContacto(req, res);
});

export default router;