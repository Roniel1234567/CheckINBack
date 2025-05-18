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
const CentroDeTrabajoController_1 = require("../controllers/CentroDeTrabajoController");
const router = (0, express_1.Router)();
// Get all centros de trabajo
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CentroDeTrabajoController_1.getAllCentrosTrabajo)(req, res);
}));
// Create new centro de trabajo
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CentroDeTrabajoController_1.createCentroTrabajo)(req, res);
}));
// Get ciudades by provincia
router.get('/ciudades/provincia/:provinciaId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CentroDeTrabajoController_1.getCiudadesByProvincia)(req, res);
}));
// Get sectores by ciudad
router.get('/sectores/ciudad/:ciudadId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CentroDeTrabajoController_1.getSectoresByCiudad)(req, res);
}));
// Verificar si existe un centro de trabajo con ese nombre
router.get('/existe-nombre/:nombre', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CentroDeTrabajoController_1.existeNombreCentro)(req, res);
}));
// Actualizar centro de trabajo por ID
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CentroDeTrabajoController_1.updateCentroTrabajo)(req, res);
}));
// Obtener centros pendientes de validación
router.get('/pendientes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CentroDeTrabajoController_1.getCentrosPendientes)(req, res);
}));
// Validar centro de trabajo (ahora acepta PUT)
router.put('/:id/validar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CentroDeTrabajoController_1.validarCentro)(req, res);
}));
exports.default = router;
