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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepository = data_source_1.AppDataSource.getRepository(User_1.Usuario);
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userRepository.find({
            relations: ['rol']
        });
        return res.status(200).json(users);
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const user = yield userRepository.findOne({
            where: { id_usuario: id },
            relations: ['rol']
        });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error('Error al obtener usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { contrasena_usuario } = _a, restOfUser = __rest(_a, ["contrasena_usuario"]);
        // Encrypt password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(contrasena_usuario, salt);
        const newUser = userRepository.create(Object.assign(Object.assign({}, restOfUser), { contrasena_usuario: hashedPassword, estado_usuario: 'Activo' }));
        const savedUser = yield userRepository.save(newUser);
        return res.status(201).json(savedUser);
    }
    catch (error) {
        console.error('Error al crear usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const user = yield userRepository.findOne({
            where: { id_usuario: id }
        });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // If password is being updated, hash it
        if (req.body.contrasena_usuario) {
            const salt = yield bcryptjs_1.default.genSalt(10);
            req.body.contrasena_usuario = yield bcryptjs_1.default.hash(req.body.contrasena_usuario, salt);
        }
        userRepository.merge(user, req.body);
        const updatedUser = yield userRepository.save(user);
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error('Error al actualizar usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const result = yield userRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteUser = deleteUser;
