import { Router, Request, Response } from 'express';
import {
    getAllPersonaContactosEst,
    getPersonaContactoEstById,
    createPersonaContactoEst,
    updatePersonaContactoEst,
    deletePersonaContactoEst
} from '../controllers/PersonaContactoEstudianteController';

const router = Router();

// Obtener todos los contactos de estudiante
router.get('/', async (req: Request, res: Response) => {
    await getAllPersonaContactosEst(req, res);
});

// Obtener contacto por ID
router.get('/:id', async (req: Request, res: Response) => {
    await getPersonaContactoEstById(req, res);
});

// Crear nuevo contacto
router.post('/', async (req: Request, res: Response) => {
    await createPersonaContactoEst(req, res);
});

// Actualizar contacto
router.put('/:id', async (req: Request, res: Response) => {
    await updatePersonaContactoEst(req, res);
});

// Eliminar contacto
router.delete('/:id', async (req: Request, res: Response) => {
    await deletePersonaContactoEst(req, res);
});

export default router; 