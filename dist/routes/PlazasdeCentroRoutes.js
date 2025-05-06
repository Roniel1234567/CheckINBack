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
const PlazasController_1 = require("../controllers/PlazasController");
const router = (0, express_1.Router)();
// Get all plazas
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PlazasController_1.getAllPlazas)(req, res);
}));
// Get plaza by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PlazasController_1.getPlazaById)(req, res);
}));
// Create new plaza
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PlazasController_1.createPlaza)(req, res);
}));
// Update plaza
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PlazasController_1.updatePlaza)(req, res);
}));
// Delete plaza
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PlazasController_1.deletePlaza)(req, res);
}));
exports.default = router;
