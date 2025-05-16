import { Router, Request, Response } from 'express';
import { 
    getAllContactos,
    getContactoById,
    createContacto,
    updateContacto,
    deleteContacto,
    existeTelefonoContacto,
    existeEmailContacto
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

// Verificar si existe un contacto con ese teléfono
router.get('/existe-telefono/:telefono', async (req: Request, res: Response) => {
    await existeTelefonoContacto(req, res);
});

// Verificar si existe un contacto con ese email
router.get('/existe-email/:email', async (req: Request, res: Response) => {
    await existeEmailContacto(req, res);
});

export default router;