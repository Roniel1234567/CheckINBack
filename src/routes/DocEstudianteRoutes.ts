import { Router, Request, Response } from 'express';
import {
    getAllDocEstudiantes,
    getDocEstudianteById,
    createDocEstudiante,
    updateDocEstudiante,
    deleteDocEstudiante,
    getArchivoEstudiante
} from '../controllers/DocEstudianteController';

const router = Router();

// Obtener todos los documentos de estudiantes
router.get('/', async (req: Request, res: Response) => {
    await getAllDocEstudiantes(req, res);
});

// Obtener documento por ID (est_doc)
router.get('/:id', async (req: Request, res: Response) => {
    await getDocEstudianteById(req, res);
});

// Crear nuevo documento
router.post('/', async (req: Request, res: Response) => {
    await createDocEstudiante(req, res);
});

// Actualizar documento
router.put('/:id', async (req: Request, res: Response) => {
    await updateDocEstudiante(req, res);
});

// Eliminar documento
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteDocEstudiante(req, res);
});

// Endpoint para descargar/visualizar un archivo específico
router.get('/:id/archivo/:tipo', async (req: Request, res: Response) => {
    await getArchivoEstudiante(req, res);
});

export default router; 