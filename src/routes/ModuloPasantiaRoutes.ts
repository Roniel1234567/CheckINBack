import { Router, Request, Response } from 'express';
import {
  getAllModulos,
  getModuloById,
  createModulo,
  updateModulo,
  deleteModulo
} from '../controllers/ModuloPasantiaController';

const router = Router();

// Obtener todos los módulos
router.get('/', async (req: Request, res: Response) => {
  await getAllModulos(req, res);
});

// Obtener módulo por ID
router.get('/:id', async (req: Request, res: Response) => {
  await getModuloById(req, res);
});

// Crear módulo
router.post('/', async (req: Request, res: Response) => {
  await createModulo(req, res);
});

// Actualizar módulo
router.put('/:id', async (req: Request, res: Response) => {
  await updateModulo(req, res);
});

// Eliminar módulo
router.delete('/:id', async (req: Request, res: Response) => {
  await deleteModulo(req, res);
});

export default router; 