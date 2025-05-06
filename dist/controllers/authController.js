"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = exports.loginController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("../data-source");
const User_1 = require("../models/User");
// Controlador de login
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dato_usuario, contrasena_usuario } = req.body;
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.Usuario);
        const user = yield userRepository.findOne({
            where: { dato_usuario },
            relations: ['rol']
        });
        if (!user) {
            res.status(400).json({ message: 'Usuario no encontrado' });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(contrasena_usuario, user.contrasena_usuario);
        if (!isMatch) {
            res.status(400).json({ message: 'Contraseña incorrecta' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login exitoso',
            token,
            user: {
                id: user.id_usuario,
                dato_usuario: user.dato_usuario,
                rol: user.rol_usuario,
                estado: user.estado_usuario
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});
exports.loginController = loginController;
// Controlador de registro
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dato_usuario, contrasena_usuario, rol_usuario } = req.body;
    if (!dato_usuario || !contrasena_usuario || !rol_usuario) {
        res.status(400).json({
            message: 'Faltan campos requeridos',
            required: ['dato_usuario', 'contrasena_usuario', 'rol_usuario']
        });
        return;
    }
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.Usuario);
        const userExists = yield userRepository.findOne({
            where: { dato_usuario }
        });
        if (userExists) {
            res.status(400).json({ message: 'El usuario ya existe' });
            return;
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(contrasena_usuario, salt);
        const newUser = userRepository.create({
            dato_usuario,
            contrasena_usuario: hashedPassword,
            rol_usuario,
            estado_usuario: 'Activo'
        });
        const savedUser = yield userRepository.save(newUser);
        const token = jsonwebtoken_1.default.sign({ id: savedUser.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            token,
            user: {
                id: savedUser.id_usuario,
                dato_usuario: savedUser.dato_usuario,
                rol: savedUser.rol_usuario,
                estado: savedUser.estado_usuario
            }
        });
    }
    catch (err) {
        console.error('Error en el registro:', err);
        res.status(500).json({
            message: 'Error en el servidor',
            error: err instanceof Error ? err.message : 'Error desconocido'
        });
    }
});
exports.registerController = registerController;
