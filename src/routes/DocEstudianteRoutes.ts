import { Router, Request, Response } from 'express';
import multer from 'multer';
import {
    getAllDocEstudiantes,
    getDocEstudianteById,
    createDocEstudiante,
    updateDocEstudiante,
    deleteDocEstudiante
} from '../controllers/DocEstudianteController';

const router = Router();
const upload = multer();

// Obtener todos los documentos de estudiantes
router.get('/', async (req: Request, res: Response) => {
    await getAllDocEstudiantes(req, res);
});

// Obtener documento de estudiante por ID
router.get('/:id', async (req: Request, res: Response) => {
    await getDocEstudianteById(req, res);
});

// Crear nuevo documento de estudiante (con archivos)
router.post('/', upload.fields([
    { name: 'id_doc_file', maxCount: 1 },
    { name: 'cv_doc_file', maxCount: 1 },
    { name: 'anexo_iv_doc_file', maxCount: 1 },
    { name: 'anexo_v_doc_file', maxCount: 1 },
    { name: 'acta_nac_doc_file', maxCount: 1 },
    { name: 'ced_padres_doc_file', maxCount: 1 },
    { name: 'vac_covid_doc_file', maxCount: 1 }
]), async (req: Request, res: Response) => {
    await createDocEstudiante(req, res);
});

// Actualizar documento de estudiante (con archivos)
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

// Eliminar documento de estudiante
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteDocEstudiante(req, res);
});

export default router; 