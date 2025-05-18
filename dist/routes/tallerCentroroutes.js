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
const TallerCentroController_1 = require("../controllers/TallerCentroController");
const router = (0, express_1.Router)();
// Crear relación taller-centro
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, TallerCentroController_1.createTallerCentro)(req, res);
}));
// Obtener centros por taller
router.get('/:id_taller', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, TallerCentroController_1.getCentrosPorTaller)(req, res);
}));
exports.default = router;
