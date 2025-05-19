import { Router } from 'express';
import { 
  loginController, 
  registerController, 
  forgotPasswordController, 
  resetPasswordController 
} from '../controllers/authController';

const router = Router();

// Ruta para el login
router.post('/login', loginController);

// Ruta para el registro de nuevos usuarios
router.post('/register', registerController);

// Ruta para solicitar recuperación de contraseña
router.post('/forgot-password', forgotPasswordController);

// Ruta para restablecer contraseña
router.post('/reset-password', resetPasswordController);

export default router;
