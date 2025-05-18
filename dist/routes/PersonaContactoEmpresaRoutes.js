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
const PersonaContactoEmpresaController_1 = require("../controllers/PersonaContactoEmpresaController");
const router = (0, express_1.Router)();
// Obtener todos los contactos de persona de empresa
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PersonaContactoEmpresaController_1.getAllPersonaContactos)(req, res);
}));
// Obtener contacto por ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PersonaContactoEmpresaController_1.getPersonaContactoById)(req, res);
}));
// Crear nuevo contacto
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PersonaContactoEmpresaController_1.createPersonaContacto)(req, res);
}));
// Actualizar contacto
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PersonaContactoEmpresaController_1.updatePersonaContacto)(req, res);
}));
// Eliminar contacto
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PersonaContactoEmpresaController_1.deletePersonaContacto)(req, res);
}));
// Obtener contacto por id de centro de trabajo
router.get('/centro/:idCentro', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, PersonaContactoEmpresaController_1.getPersonaContactoByCentro)(req, res);
}));
exports.default = router;
