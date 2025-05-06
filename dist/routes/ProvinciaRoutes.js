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
const ProvinciaController_1 = require("../controllers/ProvinciaController");
const router = (0, express_1.Router)();
// Get all provincias
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ProvinciaController_1.getAllProvincias)(req, res);
}));
// Get provincia by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ProvinciaController_1.getProvinciaById)(req, res);
}));
// Create new provincia
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ProvinciaController_1.createProvincia)(req, res);
}));
// Update provincia
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ProvinciaController_1.updateProvincia)(req, res);
}));
// Delete provincia
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ProvinciaController_1.deleteProvincia)(req, res);
}));
exports.default = router;
