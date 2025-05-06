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
exports.deleteExcusa = exports.updateExcusa = exports.createExcusa = exports.getExcusaById = exports.getAllExcusas = void 0;
const data_source_1 = require("../data-source");
const Excusa_1 = require("../models/Excusa");
const excusaRepository = data_source_1.AppDataSource.getRepository(Excusa_1.Excusa);
const getAllExcusas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const excusas = yield excusaRepository.find({
            relations: ['pasantia_exc']
        });
        return res.status(200).json(excusas);
    }
    catch (error) {
        console.error('Error al obtener excusas:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllExcusas = getAllExcusas;
const getExcusaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const excusa = yield excusaRepository.findOne({
            where: { id_exc: id },
            relations: ['pasantia_exc']
        });
        if (!excusa) {
            return res.status(404).json({ message: 'Excusa no encontrada' });
        }
        return res.status(200).json(excusa);
    }
    catch (error) {
        console.error('Error al obtener excusa:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getExcusaById = getExcusaById;
const createExcusa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newExcusa = excusaRepository.create(req.body);
        const savedExcusa = yield excusaRepository.save(newExcusa);
        return res.status(201).json(savedExcusa);
    }
    catch (error) {
        console.error('Error al crear excusa:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createExcusa = createExcusa;
const updateExcusa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const excusa = yield excusaRepository.findOne({
            where: { id_exc: id }
        });
        if (!excusa) {
            return res.status(404).json({ message: 'Excusa no encontrada' });
        }
        excusaRepository.merge(excusa, req.body);
        const updatedExcusa = yield excusaRepository.save(excusa);
        return res.status(200).json(updatedExcusa);
    }
    catch (error) {
        console.error('Error al actualizar excusa:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateExcusa = updateExcusa;
const deleteExcusa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const result = yield excusaRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Excusa no encontrada' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar excusa:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteExcusa = deleteExcusa;
