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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDireccionByCentro = exports.getDireccionByEstudianteDocumento = exports.deleteDireccion = exports.updateDireccion = exports.createDireccion = exports.getDireccionById = exports.getAllDirecciones = void 0;
const data_source_1 = require("../data-source");
const Direccion_1 = require("../models/Direccion");
const Sector_1 = require("../models/Sector");
const Estudiante_1 = require("../models/Estudiante");
const direccionRepository = data_source_1.AppDataSource.getRepository(Direccion_1.Direccion);
const getAllDirecciones = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const direcciones = yield direccionRepository.find({
            relations: ['sector_dir']
        });
        return res.status(200).json(direcciones);
    }
    catch (error) {
        console.error('Error al obtener direcciones:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllDirecciones = getAllDirecciones;
const getDireccionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const direccion = yield direccionRepository.findOne({
            where: { id_dir: id },
            relations: ['sector_dir']
        });
        if (!direccion) {
            return res.status(404).json({ message: 'Dirección no encontrada' });
        }
        return res.status(200).json(direccion);
    }
    catch (error) {
        console.error('Error al obtener dirección:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getDireccionById = getDireccionById;
const createDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { sector_dir } = _a, rest = __rest(_a, ["sector_dir"]);
        if (!sector_dir) {
            return res.status(400).json({ message: 'El sector es requerido' });
        }
        const sector = yield data_source_1.AppDataSource.getRepository(Sector_1.Sector).findOne({ where: { id_sec: sector_dir } });
        if (!sector) {
            return res.status(400).json({ message: 'Sector no encontrado' });
        }
        const newDireccion = direccionRepository.create(Object.assign(Object.assign({}, rest), { sector_dir: sector }));
        const savedDireccion = yield direccionRepository.save(newDireccion);
        return res.status(201).json(savedDireccion);
    }
    catch (error) {
        console.error('Error al crear dirección:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createDireccion = createDireccion;
const updateDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const direccion = yield direccionRepository.findOne({
            where: { id_dir: id }
        });
        if (!direccion) {
            return res.status(404).json({ message: 'Dirección no encontrada' });
        }
        direccionRepository.merge(direccion, req.body);
        const updatedDireccion = yield direccionRepository.save(direccion);
        return res.status(200).json(updatedDireccion);
    }
    catch (error) {
        console.error('Error al actualizar dirección:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateDireccion = updateDireccion;
const deleteDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const result = yield direccionRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Dirección no encontrada' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar dirección:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteDireccion = deleteDireccion;
const getDireccionByEstudianteDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const documento = req.params.documento;
    try {
        const estudianteRepo = data_source_1.AppDataSource.getRepository(Estudiante_1.Estudiante);
        const estudiante = yield estudianteRepo.findOne({
            where: { documento_id_est: documento },
            relations: [
                'direccion_id',
                'direccion_id.sector_dir',
                'direccion_id.sector_dir.ciudad',
                'direccion_id.sector_dir.ciudad.provincia'
            ]
        });
        if (!estudiante || !estudiante.direccion_id) {
            return res.status(404).json({ message: 'Dirección no encontrada para este estudiante' });
        }
        res.json(estudiante.direccion_id);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener la dirección', error });
    }
});
exports.getDireccionByEstudianteDocumento = getDireccionByEstudianteDocumento;
const getDireccionByCentro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCentro = Number(req.params.idCentro);
    try {
        const centroRepo = data_source_1.AppDataSource.getRepository('CentroDeTrabajo');
        const centro = yield centroRepo.findOne({
            where: { id_centro: idCentro },
            relations: [
                'direccion_centro',
                'direccion_centro.sector_dir',
                'direccion_centro.sector_dir.ciudad',
                'direccion_centro.sector_dir.ciudad.provincia'
            ]
        });
        if (!centro || !centro.direccion_centro) {
            return res.status(404).json({ message: 'Dirección no encontrada para este centro de trabajo' });
        }
        res.json(centro.direccion_centro);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener la dirección', error });
    }
});
exports.getDireccionByCentro = getDireccionByCentro;
