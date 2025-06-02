import { Router, Request, Response } from 'express';
import {
  getAllExcusasEstudiante,
  getExcusaEstudianteById,
  createExcusaEstudiante,
  updateExcusaEstudiante,
  deleteExcusaEstudiante
} from '../controllers/ExcusaEstudianteController';

const router = Router();

// Obtener todas las excusas
router.get('/', async (req: Request, res: Response) => {
  await getAllExcusasEstudiante(req, res);
});

// Obtener excusa por ID
router.get('/:id', async (req: Request, res: Response) => {
  await getExcusaEstudianteById(req, res);
});

// Crear excusa
router.post('/', async (req: Request, res: Response) => {
  await createExcusaEstudiante(req, res);
});

// Actualizar excusa
router.put('/:id', async (req: Request, res: Response) => {
  await updateExcusaEstudiante(req, res);
});

// Eliminar excusa
router.delete('/:id', async (req: Request, res: Response) => {
  await deleteExcusaEstudiante(req, res);
});

export default router; 