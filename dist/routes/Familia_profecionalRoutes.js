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
const Familia_profesional_Controller_1 = require("../controllers/Familia_profesional_Controller");
const router = (0, express_1.Router)();
// Get all familias profesionales
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Familia_profesional_Controller_1.getAllFamiliasProfesionales)(req, res);
}));
// Get familia profesional by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Familia_profesional_Controller_1.getFamiliaProfesionalById)(req, res);
}));
// Create new familia profesional
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Familia_profesional_Controller_1.createFamiliaProfesional)(req, res);
}));
// Update familia profesional
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Familia_profesional_Controller_1.updateFamiliaProfesional)(req, res);
}));
// Delete familia profesional
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Familia_profesional_Controller_1.deleteFamiliaProfesional)(req, res);
}));
exports.default = router;
