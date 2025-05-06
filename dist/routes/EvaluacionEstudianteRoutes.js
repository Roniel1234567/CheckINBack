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
const express_1 = require("express");
const Evaluacion_EstudianteController_1 = require("../controllers/Evaluacion_EstudianteController");
const router = (0, express_1.Router)();
// Get all evaluaciones estudiante
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Evaluacion_EstudianteController_1.getAllEvaluacionesEstudiante)(req, res);
}));
// Get evaluacion estudiante by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Evaluacion_EstudianteController_1.getEvaluacionEstudianteById)(req, res);
}));
// Create new evaluacion estudiante
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Evaluacion_EstudianteController_1.createEvaluacionEstudiante)(req, res);
}));
// Update evaluacion estudiante
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Evaluacion_EstudianteController_1.updateEvaluacionEstudiante)(req, res);
}));
// Delete evaluacion estudiante
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Evaluacion_EstudianteController_1.deleteEvaluacionEstudiante)(req, res);
}));
exports.default = router;
