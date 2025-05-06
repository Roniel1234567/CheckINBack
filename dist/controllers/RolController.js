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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRol = exports.updateRol = exports.createRol = exports.getRolById = exports.getAllRoles = void 0;
const data_source_1 = require("../data-source");
const Rol_1 = require("../models/Rol");
const rolRepository = data_source_1.AppDataSource.getRepository(Rol_1.Rol);
const getAllRoles = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield rolRepository.find();
        return res.status(200).json(roles);
    }
    catch (error) {
        console.error('Error al obtener roles:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllRoles = getAllRoles;
const getRolById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const rol = yield rolRepository.findOne({
            where: { id_rol: id }
        });
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        return res.status(200).json(rol);
    }
    catch (error) {
        console.error('Error al obtener rol:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getRolById = getRolById;
const createRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRol = rolRepository.create(req.body);
        const savedRol = yield rolRepository.save(newRol);
        return res.status(201).json(savedRol);
    }
    catch (error) {
        console.error('Error al crear rol:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createRol = createRol;
const updateRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const rol = yield rolRepository.findOne({
            where: { id_rol: id }
        });
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        rolRepository.merge(rol, req.body);
        const updatedRol = yield rolRepository.save(rol);
        return res.status(200).json(updatedRol);
    }
    catch (error) {
        console.error('Error al actualizar rol:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateRol = updateRol;
const deleteRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const result = yield rolRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar rol:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteRol = deleteRol;
