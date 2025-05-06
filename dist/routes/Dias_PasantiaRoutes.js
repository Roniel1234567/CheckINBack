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
const Dias_PasantiaController_1 = require("../controllers/Dias_PasantiaController");
const router = (0, express_1.Router)();
// Get all dias pasantia
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Dias_PasantiaController_1.getAllDiasPasantia)(req, res);
}));
// Get dia pasantia by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Dias_PasantiaController_1.getDiasPasantiaById)(req, res);
}));
// Create new dia pasantia
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Dias_PasantiaController_1.createDiasPasantia)(req, res);
}));
// Update dia pasantia
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Dias_PasantiaController_1.updateDiasPasantia)(req, res);
}));
// Delete dia pasantia
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Dias_PasantiaController_1.deleteDiasPasantia)(req, res);
}));
exports.default = router;
