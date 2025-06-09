import { Router, Request, Response } from 'express';
import {
  getAllExcusasEstudiante,
  getExcusaEstudianteById,
  createExcusaEstudiante,
  updateExcusaEstudiante,
  deleteExcusaEstudiante,
  getExcusasByEstudiante,
  getExcusasByTutor
} from '../controllers/ExcusaEstudianteController';

const router = Router();

// Obtener excusas por estudiante (más específica)
router.get('/estudiante/:documento_id_est', async (req: Request, res: Response) => {
  await getExcusasByEstudiante(req, res);
});

// Obtener excusas por tutor (más específica)
router.get('/tutor/:id_tutor', async (req: Request, res: Response) => {
  await getExcusasByTutor(req, res);
});

// Obtener todas las excusas
router.get('/', async (req: Request, res: Response) => {
  await getAllExcusasEstudiante(req, res);
});

// Obtener excusa por ID (más general, debe ir después)
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