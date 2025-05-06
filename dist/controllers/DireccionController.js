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
exports.deleteDireccion = exports.updateDireccion = exports.createDireccion = exports.getDireccionById = exports.getAllDirecciones = void 0;
const data_source_1 = require("../data-source");
const Direccion_1 = require("../models/Direccion");
const direccionRepository = data_source_1.AppDataSource.getRepository(Direccion_1.Direccion);
const getAllDirecciones = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const direcciones = yield direccionRepository.find({
            relations: ['sector_dir']
        });
        return res.status(200).json(direcciones);
    }
    catch (error) {
        console.error('Error al obtener direcciones:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllDirecciones = getAllDirecciones;
const getDireccionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const direccion = yield direccionRepository.findOne({
            where: { id_dir: id },
            relations: ['sector_dir']
        });
        if (!direccion) {
            return res.status(404).json({ message: 'Dirección no encontrada' });
        }
        return res.status(200).json(direccion);
    }
    catch (error) {
        console.error('Error al obtener dirección:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getDireccionById = getDireccionById;
const createDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDireccion = direccionRepository.create(req.body);
        const savedDireccion = yield direccionRepository.save(newDireccion);
        return res.status(201).json(savedDireccion);
    }
    catch (error) {
        console.error('Error al crear dirección:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createDireccion = createDireccion;
const updateDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const direccion = yield direccionRepository.findOne({
            where: { id_dir: id }
        });
        if (!direccion) {
            return res.status(404).json({ message: 'Dirección no encontrada' });
        }
        direccionRepository.merge(direccion, req.body);
        const updatedDireccion = yield direccionRepository.save(direccion);
        return res.status(200).json(updatedDireccion);
    }
    catch (error) {
        console.error('Error al actualizar dirección:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateDireccion = updateDireccion;
const deleteDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const result = yield direccionRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Dirección no encontrada' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar dirección:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteDireccion = deleteDireccion;
