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
const AsistenciaPasantiacontroller_1 = require("../controllers/AsistenciaPasantiacontroller");
const router = (0, express_1.Router)();
// Get all asistencias de pasantía
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, AsistenciaPasantiacontroller_1.getAllAsistenciasPasantia)(req, res);
}));
// Get asistencia de pasantía by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, AsistenciaPasantiacontroller_1.getAsistenciaPasantiaById)(req, res);
}));
// Create new asistencia de pasantía
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, AsistenciaPasantiacontroller_1.createAsistenciaPasantia)(req, res);
}));
// Update asistencia de pasantía
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, AsistenciaPasantiacontroller_1.updateAsistenciaPasantia)(req, res);
}));
// Delete asistencia de pasantía
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, AsistenciaPasantiacontroller_1.deleteAsistenciaPasantia)(req, res);
}));
exports.default = router;
