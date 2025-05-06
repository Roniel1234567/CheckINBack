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
// Get centro de trabajo by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CentroDeTrabajoController_1.getCentroTrabajoById)(req, res);
}));
// Create new centro de trabajo
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CentroDeTrabajoController_1.createCentroTrabajo)(req, res);
}));
// Update centro de trabajo
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CentroDeTrabajoController_1.updateCentroTrabajo)(req, res);
}));
// Delete centro de trabajo
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CentroDeTrabajoController_1.deleteCentroTrabajo)(req, res);
}));
exports.default = router;
