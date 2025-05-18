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
exports.deletePoliza = exports.updatePoliza = exports.createPoliza = exports.getPolizaById = exports.getAllPolizas = void 0;
const data_source_1 = require("../data-source");
const Poliza_1 = require("../models/Poliza");
const polizaRepository = data_source_1.AppDataSource.getRepository(Poliza_1.Poliza);
const getAllPolizas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const polizas = yield polizaRepository.find();
        return res.json(polizas);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener las pólizas' });
    }
});
exports.getAllPolizas = getAllPolizas;
const getPolizaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const poliza = yield polizaRepository.findOneBy({ id_poliza: parseInt(id) });
        if (!poliza)
            return res.status(404).json({ message: 'Póliza no encontrada' });
        return res.json(poliza);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener la póliza' });
    }
});
exports.getPolizaById = getPolizaById;
const createPoliza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPoliza = polizaRepository.create(req.body);
        yield polizaRepository.save(newPoliza);
        return res.status(201).json(newPoliza);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al crear la póliza' });
    }
});
exports.createPoliza = createPoliza;
const updatePoliza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const poliza = yield polizaRepository.findOneBy({ id_poliza: parseInt(id) });
        if (!poliza)
            return res.status(404).json({ message: 'Póliza no encontrada' });
        polizaRepository.merge(poliza, req.body);
        yield polizaRepository.save(poliza);
        return res.json(poliza);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la póliza' });
    }
});
exports.updatePoliza = updatePoliza;
const deletePoliza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield polizaRepository.delete({ id_poliza: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: 'Póliza no encontrada' });
        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la póliza' });
    }
});
exports.deletePoliza = deletePoliza;
