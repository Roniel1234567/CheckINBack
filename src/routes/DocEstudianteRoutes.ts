import { Router, Request, Response } from 'express';
import {
    getAllDocEstudiantes,
    getDocEstudianteById,
    createDocEstudiante,
    updateDocEstudiante,
    deleteDocEstudiante,
    getArchivoEstudiante
} from '../controllers/DocEstudianteController';
import multer from 'multer';

const router = Router();
const upload = multer();

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

// Actualizar documento (con soporte para archivos)
router.put('/:id', upload.fields([
  { name: 'id_doc_file', maxCount: 1 },
  { name: 'cv_doc_file', maxCount: 1 },
  { name: 'anexo_iv_doc_file', maxCount: 1 },
  { name: 'anexo_v_doc_file', maxCount: 1 },
  { name: 'acta_nac_doc_file', maxCount: 1 },
  { name: 'ced_padres_doc_file', maxCount: 1 },
  { name: 'vac_covid_doc_file', maxCount: 1 }
]), async (req: Request, res: Response) => {
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