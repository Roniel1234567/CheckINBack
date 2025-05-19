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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DocEstudianteController_1 = require("../controllers/DocEstudianteController");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
// Obtener todos los documentos de estudiantes
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, DocEstudianteController_1.getAllDocEstudiantes)(req, res);
}));
// ¡IMPORTANTE! Ruta específica antes que la genérica
// Obtener documentos por documento de estudiante (est_doc)
router.get('/estudiante/:documento', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, DocEstudianteController_1.getDocEstudianteByDocumento)(req, res);
}));
// Obtener documento por ID (est_doc)
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, DocEstudianteController_1.getDocEstudianteById)(req, res);
}));
// Crear nuevo documento
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, DocEstudianteController_1.createDocEstudiante)(req, res);
}));
// Actualizar documento (con soporte para archivos)
router.put('/:id', upload.fields([
    { name: 'id_doc_file', maxCount: 1 },
    { name: 'cv_doc_file', maxCount: 1 },
    { name: 'anexo_iv_doc_file', maxCount: 1 },
    { name: 'anexo_v_doc_file', maxCount: 1 },
    { name: 'acta_nac_doc_file', maxCount: 1 },
    { name: 'ced_padres_doc_file', maxCount: 1 },
    { name: 'vac_covid_doc_file', maxCount: 1 }
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, DocEstudianteController_1.updateDocEstudiante)(req, res);
}));
// Eliminar documento
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, DocEstudianteController_1.deleteDocEstudiante)(req, res);
}));
// Endpoint para descargar/visualizar un archivo específico
router.get('/:id/archivo/:tipo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, DocEstudianteController_1.getArchivoEstudiante)(req, res);
}));
exports.default = router;
