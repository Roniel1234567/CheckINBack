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
const PersonaContactoEstudianteController_1 = require("../controllers/PersonaContactoEstudianteController");
const router = (0, express_1.Router)();
// Obtener todos los contactos de estudiante
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PersonaContactoEstudianteController_1.getAllPersonaContactosEst)(req, res);
}));
// Obtener contacto por ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PersonaContactoEstudianteController_1.getPersonaContactoEstById)(req, res);
}));
// Crear nuevo contacto
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PersonaContactoEstudianteController_1.createPersonaContactoEst)(req, res);
}));
// Actualizar contacto
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PersonaContactoEstudianteController_1.updatePersonaContactoEst)(req, res);
}));
// Eliminar contacto
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PersonaContactoEstudianteController_1.deletePersonaContactoEst)(req, res);
}));
// Obtener contacto por documento de estudiante
router.get('/estudiante/:documento', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PersonaContactoEstudianteController_1.getPersonaContactoEstByDocumento)(req, res);
}));
exports.default = router;
