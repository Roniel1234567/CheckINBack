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
exports.deletePasantia = exports.updatePasantia = exports.createPasantia = exports.getPasantiaById = exports.getAllPasantias = void 0;
const data_source_1 = require("../data-source");
const Pasantia_1 = require("../models/Pasantia");
const pasantiaRepository = data_source_1.AppDataSource.getRepository(Pasantia_1.Pasantia);
const getAllPasantias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pasantias = yield pasantiaRepository.find();
        return res.json(pasantias);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener las pasantías' });
    }
});
exports.getAllPasantias = getAllPasantias;
const getPasantiaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const pasantia = yield pasantiaRepository.findOneBy({ id_pas: parseInt(id) });
        if (!pasantia)
            return res.status(404).json({ message: 'Pasantía no encontrada' });
        return res.json(pasantia);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener la pasantía' });
    }
});
exports.getPasantiaById = getPasantiaById;
const createPasantia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPasantia = pasantiaRepository.create(req.body);
        yield pasantiaRepository.save(newPasantia);
        return res.status(201).json(newPasantia);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al crear la pasantía' });
    }
});
exports.createPasantia = createPasantia;
const updatePasantia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const pasantia = yield pasantiaRepository.findOneBy({ id_pas: parseInt(id) });
        if (!pasantia)
            return res.status(404).json({ message: 'Pasantía no encontrada' });
        pasantiaRepository.merge(pasantia, req.body);
        yield pasantiaRepository.save(pasantia);
        return res.json(pasantia);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la pasantía' });
    }
});
exports.updatePasantia = updatePasantia;
const deletePasantia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield pasantiaRepository.delete({ id_pas: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: 'Pasantía no encontrada' });
        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la pasantía' });
    }
});
exports.deletePasantia = deletePasantia;
