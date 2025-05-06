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
const Visita_EstudianteController_1 = require("../controllers/Visita_EstudianteController");
const router = (0, express_1.Router)();
// Get all visitas de estudiantes
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Visita_EstudianteController_1.getAllVisitasEstudiantes)(req, res);
}));
// Get visita de estudiante by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Visita_EstudianteController_1.getVisitaEstudianteById)(req, res);
}));
// Create new visita de estudiante
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Visita_EstudianteController_1.createVisitaEstudiante)(req, res);
}));
// Update visita de estudiante
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Visita_EstudianteController_1.updateVisitaEstudiante)(req, res);
}));
// Delete visita de estudiante
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Visita_EstudianteController_1.deleteVisitaEstudiante)(req, res);
}));
exports.default = router;
