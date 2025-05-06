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
exports.deleteEvaluacionEstudiante = exports.updateEvaluacionEstudiante = exports.createEvaluacionEstudiante = exports.getEvaluacionEstudianteById = exports.getAllEvaluacionesEstudiante = void 0;
const data_source_1 = require("../data-source");
const Evaluacion_estudiantes_1 = require("../models/Evaluacion_estudiantes");
const evaluacionEstudianteRepository = data_source_1.AppDataSource.getRepository(Evaluacion_estudiantes_1.EvaluacionEstudiante);
const getAllEvaluacionesEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const evaluaciones = yield evaluacionEstudianteRepository.find();
        return res.json(evaluaciones);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener las evaluaciones de estudiantes' });
    }
});
exports.getAllEvaluacionesEstudiante = getAllEvaluacionesEstudiante;
const getEvaluacionEstudianteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const evaluacion = yield evaluacionEstudianteRepository.findOneBy({ id_eval_est: parseInt(id) });
        if (!evaluacion)
            return res.status(404).json({ message: 'Evaluación de estudiante no encontrada' });
        return res.json(evaluacion);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener la evaluación de estudiante' });
    }
});
exports.getEvaluacionEstudianteById = getEvaluacionEstudianteById;
const createEvaluacionEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEvaluacion = evaluacionEstudianteRepository.create(req.body);
        yield evaluacionEstudianteRepository.save(newEvaluacion);
        return res.status(201).json(newEvaluacion);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al crear la evaluación de estudiante' });
    }
});
exports.createEvaluacionEstudiante = createEvaluacionEstudiante;
const updateEvaluacionEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const evaluacion = yield evaluacionEstudianteRepository.findOneBy({ id_eval_est: parseInt(id) });
        if (!evaluacion)
            return res.status(404).json({ message: 'Evaluación de estudiante no encontrada' });
        evaluacionEstudianteRepository.merge(evaluacion, req.body);
        yield evaluacionEstudianteRepository.save(evaluacion);
        return res.json(evaluacion);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la evaluación de estudiante' });
    }
});
exports.updateEvaluacionEstudiante = updateEvaluacionEstudiante;
const deleteEvaluacionEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield evaluacionEstudianteRepository.delete({ id_eval_est: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: 'Evaluación de estudiante no encontrada' });
        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la evaluación de estudiante' });
    }
});
exports.deleteEvaluacionEstudiante = deleteEvaluacionEstudiante;
