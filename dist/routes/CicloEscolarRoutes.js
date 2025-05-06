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
const CicloEscolarController_1 = require("../controllers/CicloEscolarController");
const router = (0, express_1.Router)();
// Get all ciclos escolares
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CicloEscolarController_1.getAllCiclosEscolares)(req, res);
}));
// Get ciclo escolar by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CicloEscolarController_1.getCicloEscolarById)(req, res);
}));
// Create new ciclo escolar
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CicloEscolarController_1.createCicloEscolar)(req, res);
}));
// Update ciclo escolar
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CicloEscolarController_1.updateCicloEscolar)(req, res);
}));
// Delete ciclo escolar
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, CicloEscolarController_1.deleteCicloEscolar)(req, res);
}));
exports.default = router;
