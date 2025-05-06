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
exports.deleteAsistencia = exports.updateAsistencia = exports.createAsistencia = exports.getAsistenciaById = exports.getAllAsistencias = void 0;
const data_source_1 = require("../data-source");
const Asistencia_1 = require("../models/Asistencia");
const asistenciaRepository = data_source_1.AppDataSource.getRepository(Asistencia_1.AsistenciaPasantia);
const getAllAsistencias = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asistencias = yield asistenciaRepository.find({
            relations: ['pasantia_asis', 'excusa_asis']
        });
        return res.status(200).json(asistencias);
    }
    catch (error) {
        console.error('Error al obtener asistencias:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllAsistencias = getAllAsistencias;
const getAsistenciaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const asistencia = yield asistenciaRepository.findOne({
            where: { id_asis: id },
            relations: ['pasantia_asis', 'excusa_asis']
        });
        if (!asistencia) {
            return res.status(404).json({ message: 'Asistencia no encontrada' });
        }
        return res.status(200).json(asistencia);
    }
    catch (error) {
        console.error('Error al obtener asistencia:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAsistenciaById = getAsistenciaById;
const createAsistencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAsistencia = asistenciaRepository.create(req.body);
        const savedAsistencia = yield asistenciaRepository.save(newAsistencia);
        return res.status(201).json(savedAsistencia);
    }
    catch (error) {
        console.error('Error al crear asistencia:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createAsistencia = createAsistencia;
const updateAsistencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const asistencia = yield asistenciaRepository.findOne({
            where: { id_asis: id }
        });
        if (!asistencia) {
            return res.status(404).json({ message: 'Asistencia no encontrada' });
        }
        asistenciaRepository.merge(asistencia, req.body);
        const updatedAsistencia = yield asistenciaRepository.save(asistencia);
        return res.status(200).json(updatedAsistencia);
    }
    catch (error) {
        console.error('Error al actualizar asistencia:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateAsistencia = updateAsistencia;
const deleteAsistencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const result = yield asistenciaRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Asistencia no encontrada' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar asistencia:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteAsistencia = deleteAsistencia;
