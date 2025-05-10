import { Router } from 'express';
import {
    getAllEstudiantes,
    getEstudianteById,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante
} from '../controllers/EstudianteController';

const router = Router();

// Obtener todos los estudiantes
router.get('/', getAllEstudiantes);

// Obtener un estudiante por ID
router.get('/:id', getEstudianteById);

// Crear un nuevo estudiante
router.post('/', createEstudiante);

// Actualizar un estudiante
router.put('/:id', updateEstudiante);

// Eliminar un estudiante
router.delete('/:id', deleteEstudiante);

export default router; 