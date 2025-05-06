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
exports.deleteEvaluacionCentro = exports.updateEvaluacionCentro = exports.createEvaluacionCentro = exports.getEvaluacionCentroById = exports.getAllEvaluacionesCentro = void 0;
const data_source_1 = require("../data-source");
const Evaluacion_centro_1 = require("../models/Evaluacion_centro");
const evaluacionRepository = data_source_1.AppDataSource.getRepository(Evaluacion_centro_1.EvaluacionCentroTrabajo);
// Get all evaluaciones
const getAllEvaluacionesCentro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const evaluaciones = yield evaluacionRepository.find();
        return res.json(evaluaciones);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener evaluaciones' });
    }
});
exports.getAllEvaluacionesCentro = getAllEvaluacionesCentro;
// Get evaluacion by ID
const getEvaluacionCentroById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const evaluacion = yield evaluacionRepository.findOneBy({ id_eval_centro: id });
        if (!evaluacion)
            return res.status(404).json({ message: 'Evaluación no encontrada' });
        return res.json(evaluacion);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener evaluación' });
    }
});
exports.getEvaluacionCentroById = getEvaluacionCentroById;
// Create evaluacion
const createEvaluacionCentro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const evaluacion = evaluacionRepository.create(req.body);
        yield evaluacionRepository.save(evaluacion);
        return res.status(201).json(evaluacion);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al crear evaluación' });
    }
});
exports.createEvaluacionCentro = createEvaluacionCentro;
// Update evaluacion
const updateEvaluacionCentro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const evaluacion = yield evaluacionRepository.findOneBy({ id_eval_centro: id });
        if (!evaluacion)
            return res.status(404).json({ message: 'Evaluación no encontrada' });
        evaluacionRepository.merge(evaluacion, req.body);
        yield evaluacionRepository.save(evaluacion);
        return res.json(evaluacion);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar evaluación' });
    }
});
exports.updateEvaluacionCentro = updateEvaluacionCentro;
// Delete evaluacion
const deleteEvaluacionCentro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield evaluacionRepository.delete(id);
        if (result.affected === 0)
            return res.status(404).json({ message: 'Evaluación no encontrada' });
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al eliminar evaluación' });
    }
});
exports.deleteEvaluacionCentro = deleteEvaluacionCentro;
