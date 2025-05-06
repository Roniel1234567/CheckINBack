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
exports.deleteAsistenciaPasantia = exports.updateAsistenciaPasantia = exports.createAsistenciaPasantia = exports.getAsistenciaPasantiaById = exports.getAllAsistenciasPasantia = void 0;
const data_source_1 = require("../data-source");
const Asistencia_1 = require("../models/Asistencia");
const asistenciaPasantiaRepository = data_source_1.AppDataSource.getRepository(Asistencia_1.AsistenciaPasantia);
const getAllAsistenciasPasantia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asistencias = yield asistenciaPasantiaRepository.find();
        return res.json(asistencias);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener las asistencias de pasantía' });
    }
});
exports.getAllAsistenciasPasantia = getAllAsistenciasPasantia;
const getAsistenciaPasantiaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const asistencia = yield asistenciaPasantiaRepository.findOneBy({ id_asis: parseInt(id) });
        if (!asistencia)
            return res.status(404).json({ message: 'Asistencia de pasantía no encontrada' });
        return res.json(asistencia);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener la asistencia de pasantía' });
    }
});
exports.getAsistenciaPasantiaById = getAsistenciaPasantiaById;
const createAsistenciaPasantia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAsistencia = asistenciaPasantiaRepository.create(req.body);
        yield asistenciaPasantiaRepository.save(newAsistencia);
        return res.status(201).json(newAsistencia);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al crear la asistencia de pasantía' });
    }
});
exports.createAsistenciaPasantia = createAsistenciaPasantia;
const updateAsistenciaPasantia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const asistencia = yield asistenciaPasantiaRepository.findOneBy({ id_asis: parseInt(id) });
        if (!asistencia)
            return res.status(404).json({ message: 'Asistencia de pasantía no encontrada' });
        asistenciaPasantiaRepository.merge(asistencia, req.body);
        yield asistenciaPasantiaRepository.save(asistencia);
        return res.json(asistencia);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la asistencia de pasantía' });
    }
});
exports.updateAsistenciaPasantia = updateAsistenciaPasantia;
const deleteAsistenciaPasantia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield asistenciaPasantiaRepository.delete({ id_asis: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: 'Asistencia de pasantía no encontrada' });
        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la asistencia de pasantía' });
    }
});
exports.deleteAsistenciaPasantia = deleteAsistenciaPasantia;
