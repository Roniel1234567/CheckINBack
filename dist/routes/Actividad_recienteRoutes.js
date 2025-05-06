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
const ActividadRecienteController_1 = require("../controllers/ActividadRecienteController");
const router = (0, express_1.Router)();
// Get all actividades recientes
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ActividadRecienteController_1.getAllActividadesRecientes)(req, res);
}));
// Get actividad reciente by ID
router.get('/:usuario_act/:actividad/:entidad_act/:registro_act', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ActividadRecienteController_1.getActividadRecienteById)(req, res);
}));
// Create new actividad reciente
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ActividadRecienteController_1.createActividadReciente)(req, res);
}));
// Update actividad reciente
router.put('/:usuario_act/:actividad/:entidad_act/:registro_act', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ActividadRecienteController_1.updateActividadReciente)(req, res);
}));
// Delete actividad reciente
router.delete('/:usuario_act/:actividad/:entidad_act/:registro_act', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ActividadRecienteController_1.deleteActividadReciente)(req, res);
}));
exports.default = router;
