import { Router, Request, Response } from 'express';
import {
    getAllPersonaContactos,
    getPersonaContactoById,
    createPersonaContacto,
    updatePersonaContacto,
    deletePersonaContacto,
    getPersonaContactoByCentro
} from '../controllers/PersonaContactoEmpresaController';

const router = Router();

// Obtener todos los contactos de persona de empresa
router.get('/', async (req: Request, res: Response) => {
    await getAllPersonaContactos(req, res);
});

// Obtener contacto por ID
router.get('/:id', async (req: Request, res: Response) => {
    await getPersonaContactoById(req, res);
});

// Crear nuevo contacto
router.post('/', async (req: Request, res: Response) => {
    await createPersonaContacto(req, res);
});

// Actualizar contacto
router.put('/:id', async (req: Request, res: Response) => {
    await updatePersonaContacto(req, res);
});

// Eliminar contacto
router.delete('/:id', async (req: Request, res: Response) => {
    await deletePersonaContacto(req, res);
});

// Obtener contacto por id de centro de trabajo
router.get('/centro/:idCentro', async (req: Request, res: Response) => {
    await getPersonaContactoByCentro(req, res);
});

export default router; 