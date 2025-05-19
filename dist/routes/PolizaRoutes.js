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
const PolizaController_1 = require("../controllers/PolizaController");
const router = (0, express_1.Router)();
// Obtener todas las pólizas
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PolizaController_1.getAllPolizas)(req, res);
}));
// Obtener póliza por ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PolizaController_1.getPolizaById)(req, res);
}));
// Crear nueva póliza
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PolizaController_1.createPoliza)(req, res);
}));
// Actualizar póliza
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PolizaController_1.updatePoliza)(req, res);
}));
// Eliminar póliza
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PolizaController_1.deletePoliza)(req, res);
}));
exports.default = router;
