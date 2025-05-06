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
exports.deleteDiasPasantia = exports.updateDiasPasantia = exports.createDiasPasantia = exports.getDiasPasantiaById = exports.getAllDiasPasantia = void 0;
const data_source_1 = require("../data-source");
const Dias_pasantia_1 = require("../models/Dias_pasantia");
const diasPasantiaRepository = data_source_1.AppDataSource.getRepository(Dias_pasantia_1.DiasPasantia);
const getAllDiasPasantia = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dias = yield diasPasantiaRepository.find({
            relations: ['pasantia_diapas']
        });
        return res.status(200).json(dias);
    }
    catch (error) {
        console.error('Error al obtener días de pasantía:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllDiasPasantia = getAllDiasPasantia;
const getDiasPasantiaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const dia = yield diasPasantiaRepository.findOne({
            where: { id_diapas: id },
            relations: ['pasantia_diapas']
        });
        if (!dia) {
            return res.status(404).json({ message: 'Día de pasantía no encontrado' });
        }
        return res.status(200).json(dia);
    }
    catch (error) {
        console.error('Error al obtener día de pasantía:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getDiasPasantiaById = getDiasPasantiaById;
const createDiasPasantia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDia = diasPasantiaRepository.create(Object.assign(Object.assign({}, req.body), { creacion_diapas: new Date() }));
        const savedDia = yield diasPasantiaRepository.save(newDia);
        return res.status(201).json(savedDia);
    }
    catch (error) {
        console.error('Error al crear día de pasantía:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createDiasPasantia = createDiasPasantia;
const updateDiasPasantia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const dia = yield diasPasantiaRepository.findOne({
            where: { id_diapas: id }
        });
        if (!dia) {
            return res.status(404).json({ message: 'Día de pasantía no encontrado' });
        }
        diasPasantiaRepository.merge(dia, req.body);
        const updatedDia = yield diasPasantiaRepository.save(dia);
        return res.status(200).json(updatedDia);
    }
    catch (error) {
        console.error('Error al actualizar día de pasantía:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateDiasPasantia = updateDiasPasantia;
const deleteDiasPasantia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const result = yield diasPasantiaRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Día de pasantía no encontrado' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar día de pasantía:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteDiasPasantia = deleteDiasPasantia;
