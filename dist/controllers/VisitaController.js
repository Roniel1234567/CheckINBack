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
exports.deleteVisita = exports.updateVisita = exports.createVisita = exports.getVisitaById = exports.getAllVisitas = void 0;
const data_source_1 = require("../data-source");
const Visita_1 = require("../models/Visita");
const visitaRepository = data_source_1.AppDataSource.getRepository(Visita_1.Visita);
const getAllVisitas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visitas = yield visitaRepository.find();
        return res.json(visitas);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener las visitas' });
    }
});
exports.getAllVisitas = getAllVisitas;
const getVisitaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const visita = yield visitaRepository.findOneBy({ id_vis: parseInt(id) });
        if (!visita)
            return res.status(404).json({ message: 'Visita no encontrada' });
        return res.json(visita);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener la visita' });
    }
});
exports.getVisitaById = getVisitaById;
const createVisita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newVisita = visitaRepository.create(req.body);
        yield visitaRepository.save(newVisita);
        return res.status(201).json(newVisita);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al crear la visita' });
    }
});
exports.createVisita = createVisita;
const updateVisita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const visita = yield visitaRepository.findOneBy({ id_vis: parseInt(id) });
        if (!visita)
            return res.status(404).json({ message: 'Visita no encontrada' });
        visitaRepository.merge(visita, req.body);
        yield visitaRepository.save(visita);
        return res.json(visita);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la visita' });
    }
});
exports.updateVisita = updateVisita;
const deleteVisita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield visitaRepository.delete({ id_vis: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: 'Visita no encontrada' });
        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la visita' });
    }
});
exports.deleteVisita = deleteVisita;
