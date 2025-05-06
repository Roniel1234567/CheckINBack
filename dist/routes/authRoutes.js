"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Ruta para el login
router.post('/login', authController_1.loginController);
// Ruta para el registro de nuevos usuarios
router.post('/register', authController_1.registerController);
exports.default = router;
