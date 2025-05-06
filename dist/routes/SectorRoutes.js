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
const SectorController_1 = require("../controllers/SectorController");
const router = (0, express_1.Router)();
// Get all sectores
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, SectorController_1.getAllSectores)(req, res);
}));
// Get sector by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, SectorController_1.getSectorById)(req, res);
}));
// Create new sector
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, SectorController_1.createSector)(req, res);
}));
// Update sector
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, SectorController_1.updateSector)(req, res);
}));
// Delete sector
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, SectorController_1.deleteSector)(req, res);
}));
exports.default = router;
