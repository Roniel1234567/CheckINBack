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
exports.deleteTaller = exports.updateTaller = exports.createTaller = exports.getTallerById = exports.getAllTalleres = void 0;
const data_source_1 = require("../data-source");
const Taller_1 = require("../models/Taller");
const tallerRepository = data_source_1.AppDataSource.getRepository(Taller_1.Taller);
const getAllTalleres = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const talleres = yield tallerRepository.find({
            relations: ['familia_taller']
        });
        return res.status(200).json(talleres);
    }
    catch (error) {
        console.error('Error al obtener talleres:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllTalleres = getAllTalleres;
const getTallerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const taller = yield tallerRepository.findOne({
            where: { id_taller: id },
            relations: ['familia_taller']
        });
        if (!taller) {
            return res.status(404).json({ message: 'Taller no encontrado' });
        }
        return res.status(200).json(taller);
    }
    catch (error) {
        console.error('Error al obtener taller:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getTallerById = getTallerById;
const createTaller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTaller = tallerRepository.create(req.body);
        const savedTaller = yield tallerRepository.save(newTaller);
        return res.status(201).json(savedTaller);
    }
    catch (error) {
        console.error('Error al crear taller:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createTaller = createTaller;
const updateTaller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const taller = yield tallerRepository.findOne({
            where: { id_taller: id }
        });
        if (!taller) {
            return res.status(404).json({ message: 'Taller no encontrado' });
        }
        tallerRepository.merge(taller, req.body);
        const updatedTaller = yield tallerRepository.save(taller);
        return res.status(200).json(updatedTaller);
    }
    catch (error) {
        console.error('Error al actualizar taller:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateTaller = updateTaller;
const deleteTaller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const result = yield tallerRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Taller no encontrado' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar taller:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteTaller = deleteTaller;
