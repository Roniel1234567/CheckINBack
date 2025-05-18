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
const DireccionController_1 = require("../controllers/DireccionController");
const router = (0, express_1.Router)();
// Get all direcciones
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, DireccionController_1.getAllDirecciones)(req, res);
}));
// Get direccion by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, DireccionController_1.getDireccionById)(req, res);
}));
// Create new direccion
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, DireccionController_1.createDireccion)(req, res);
}));
// Update direccion
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, DireccionController_1.updateDireccion)(req, res);
}));
// Delete direccion
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, DireccionController_1.deleteDireccion)(req, res);
}));
// Obtener dirección completa por documento de estudiante
router.get('/estudiante/:documento', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, DireccionController_1.getDireccionByEstudianteDocumento)(req, res);
}));
// Obtener dirección completa por id de centro de trabajo
router.get('/centro/:idCentro', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, DireccionController_1.getDireccionByCentro)(req, res);
}));
exports.default = router;
