import { Router } from 'express';
import {
    getAllAdministradores,
    getAdministradorById,
    createAdministrador,
    updateAdministrador,
    deleteAdministrador
} from '../controllers/AdministradorController';

const router = Router();

// Get all administradores
router.get('/', getAllAdministradores);

// Get administrador by id
router.get('/:id', getAdministradorById);

// Create new administrador
router.post('/', createAdministrador);

// Update administrador
router.put('/:id', updateAdministrador);

// Delete administrador
router.delete('/:id', deleteAdministrador);

export default router; 