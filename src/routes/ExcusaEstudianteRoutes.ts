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
router.get('/excusas-estudiante/estudiante/:documento_id_est', async (req: Request, res: Response) => {
  await getExcusasByEstudiante(req, res);
});

// Obtener excusas por tutor (más específica)
router.get('/excusas-estudiante/tutor/:id_tutor', async (req: Request, res: Response) => {
  await getExcusasByTutor(req, res);
});

// Obtener todas las excusas
router.get('/excusas-estudiante', async (req: Request, res: Response) => {
  await getAllExcusasEstudiante(req, res);
});

// Obtener excusa por ID (más general, debe ir después)
router.get('/excusas-estudiante/:id', async (req: Request, res: Response) => {
  await getExcusaEstudianteById(req, res);
});

// Crear excusa
router.post('/excusas-estudiante', async (req: Request, res: Response) => {
  await createExcusaEstudiante(req, res);
});

// Actualizar excusa
router.put('/excusas-estudiante/:id', async (req: Request, res: Response) => {
  await updateExcusaEstudiante(req, res);
});

// Eliminar excusa
router.delete('/excusas-estudiante/:id', async (req: Request, res: Response) => {
  await deleteExcusaEstudiante(req, res);
});

export default router; 