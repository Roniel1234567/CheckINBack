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
const TallerController_1 = require("../controllers/TallerController");
const router = (0, express_1.Router)();
// Get all talleres
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, TallerController_1.getAllTalleres)(req, res);
}));
// Get taller by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, TallerController_1.getTallerById)(req, res);
}));
// Create new taller
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, TallerController_1.createTaller)(req, res);
}));
// Update taller
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, TallerController_1.updateTaller)(req, res);
}));
// Delete taller
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, TallerController_1.deleteTaller)(req, res);
}));
exports.default = router;
