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
exports.deleteFamiliaProfesional = exports.updateFamiliaProfesional = exports.createFamiliaProfesional = exports.getFamiliaProfesionalById = exports.getAllFamiliasProfesionales = void 0;
const data_source_1 = require("../data-source");
const familia_profecional_1 = require("../models/familia_profecional");
const familiaProfesionalRepository = data_source_1.AppDataSource.getRepository(familia_profecional_1.FamiliaProfesional);
const getAllFamiliasProfesionales = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const familias = yield familiaProfesionalRepository.find();
        return res.status(200).json(familias);
    }
    catch (error) {
        console.error('Error al obtener familias profesionales:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllFamiliasProfesionales = getAllFamiliasProfesionales;
const getFamiliaProfesionalById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id || id.length !== 3) {
            return res.status(400).json({ message: 'ID inválido - debe ser de 3 caracteres' });
        }
        const familia = yield familiaProfesionalRepository.findOne({
            where: { id_fam: id }
        });
        if (!familia) {
            return res.status(404).json({ message: 'Familia profesional no encontrada' });
        }
        return res.status(200).json(familia);
    }
    catch (error) {
        console.error('Error al obtener familia profesional:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getFamiliaProfesionalById = getFamiliaProfesionalById;
const createFamiliaProfesional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newFamilia = familiaProfesionalRepository.create(req.body);
        const savedFamilia = yield familiaProfesionalRepository.save(newFamilia);
        return res.status(201).json(savedFamilia);
    }
    catch (error) {
        console.error('Error al crear familia profesional:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createFamiliaProfesional = createFamiliaProfesional;
const updateFamiliaProfesional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id || id.length !== 3) {
            return res.status(400).json({ message: 'ID inválido - debe ser de 3 caracteres' });
        }
        const familia = yield familiaProfesionalRepository.findOne({
            where: { id_fam: id }
        });
        if (!familia) {
            return res.status(404).json({ message: 'Familia profesional no encontrada' });
        }
        familiaProfesionalRepository.merge(familia, req.body);
        const updatedFamilia = yield familiaProfesionalRepository.save(familia);
        return res.status(200).json(updatedFamilia);
    }
    catch (error) {
        console.error('Error al actualizar familia profesional:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateFamiliaProfesional = updateFamiliaProfesional;
const deleteFamiliaProfesional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id || id.length !== 3) {
            return res.status(400).json({ message: 'ID inválido - debe ser de 3 caracteres' });
        }
        const result = yield familiaProfesionalRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Familia profesional no encontrada' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar familia profesional:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteFamiliaProfesional = deleteFamiliaProfesional;
