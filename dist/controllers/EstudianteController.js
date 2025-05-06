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
exports.deleteEstudiante = exports.updateEstudiante = exports.createEstudiante = exports.getEstudianteById = exports.getAllEstudiantes = void 0;
const data_source_1 = require("../data-source");
const Estudiante_1 = require("../models/Estudiante");
const estudianteRepository = data_source_1.AppDataSource.getRepository(Estudiante_1.Estudiante);
const getAllEstudiantes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudiantes = yield estudianteRepository.find({
            relations: ['usuario_est', 'contacto_est', 'taller_est', 'direccion_id', 'ciclo_escolar_est']
        });
        return res.status(200).json(estudiantes);
    }
    catch (error) {
        console.error('Error al obtener estudiantes:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllEstudiantes = getAllEstudiantes;
const getEstudianteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const estudiante = yield estudianteRepository.findOne({
            where: { documento_id_est: id },
            relations: ['usuario_est', 'contacto_est', 'taller_est', 'direccion_id', 'ciclo_escolar_est']
        });
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        return res.status(200).json(estudiante);
    }
    catch (error) {
        console.error('Error al obtener estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getEstudianteById = getEstudianteById;
const createEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEstudiante = estudianteRepository.create(req.body);
        const savedEstudiante = yield estudianteRepository.save(newEstudiante);
        return res.status(201).json(savedEstudiante);
    }
    catch (error) {
        console.error('Error al crear estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createEstudiante = createEstudiante;
const updateEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const estudiante = yield estudianteRepository.findOne({
            where: { documento_id_est: id }
        });
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        estudianteRepository.merge(estudiante, req.body);
        const updatedEstudiante = yield estudianteRepository.save(estudiante);
        return res.status(200).json(updatedEstudiante);
    }
    catch (error) {
        console.error('Error al actualizar estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateEstudiante = updateEstudiante;
const deleteEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield estudianteRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteEstudiante = deleteEstudiante;
