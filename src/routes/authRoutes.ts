import { Router } from 'express';
import { loginController, registerController } from '../controllers/authController';

const router = Router();

// Ruta para el login
router.post('/login', loginController);

// Ruta para el registro de nuevos usuarios
router.post('/register', registerController);

export default router;
