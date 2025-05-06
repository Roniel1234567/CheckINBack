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
exports.deleteVisitaEstudiante = exports.updateVisitaEstudiante = exports.createVisitaEstudiante = exports.getVisitaEstudianteById = exports.getAllVisitasEstudiantes = void 0;
const data_source_1 = require("../data-source");
const Visita_estudiante_1 = require("../models/Visita_estudiante");
const visitaEstudianteRepository = data_source_1.AppDataSource.getRepository(Visita_estudiante_1.VisitaEstudiante);
const getAllVisitasEstudiantes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visitasEstudiantes = yield visitaEstudianteRepository.find({
            relations: ['visita', 'estudiante_vis']
        });
        return res.status(200).json(visitasEstudiantes);
    }
    catch (error) {
        console.error('Error al obtener visitas de estudiantes:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllVisitasEstudiantes = getAllVisitasEstudiantes;
const getVisitaEstudianteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const visitaEstudiante = yield visitaEstudianteRepository.findOne({
            where: { visita_est: id },
            relations: ['visita', 'estudiante_vis']
        });
        if (!visitaEstudiante) {
            return res.status(404).json({ message: 'Visita de estudiante no encontrada' });
        }
        return res.status(200).json(visitaEstudiante);
    }
    catch (error) {
        console.error('Error al obtener visita de estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getVisitaEstudianteById = getVisitaEstudianteById;
const createVisitaEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newVisitaEstudiante = visitaEstudianteRepository.create(req.body);
        const savedVisitaEstudiante = yield visitaEstudianteRepository.save(newVisitaEstudiante);
        return res.status(201).json(savedVisitaEstudiante);
    }
    catch (error) {
        console.error('Error al crear visita de estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createVisitaEstudiante = createVisitaEstudiante;
const updateVisitaEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const visitaEstudiante = yield visitaEstudianteRepository.findOne({
            where: { visita_est: id }
        });
        if (!visitaEstudiante) {
            return res.status(404).json({ message: 'Visita de estudiante no encontrada' });
        }
        visitaEstudianteRepository.merge(visitaEstudiante, req.body);
        const updatedVisitaEstudiante = yield visitaEstudianteRepository.save(visitaEstudiante);
        return res.status(200).json(updatedVisitaEstudiante);
    }
    catch (error) {
        console.error('Error al actualizar visita de estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateVisitaEstudiante = updateVisitaEstudiante;
const deleteVisitaEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const result = yield visitaEstudianteRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Visita de estudiante no encontrada' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar visita de estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteVisitaEstudiante = deleteVisitaEstudiante;
