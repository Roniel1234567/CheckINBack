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
exports.deleteProvincia = exports.updateProvincia = exports.createProvincia = exports.getProvinciaById = exports.getAllProvincias = void 0;
const data_source_1 = require("../data-source");
const Provincia_1 = require("../models/Provincia");
const provinciaRepository = data_source_1.AppDataSource.getRepository(Provincia_1.Provincia);
const getAllProvincias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provincias = yield provinciaRepository.find();
        return res.json(provincias);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener las provincias' });
    }
});
exports.getAllProvincias = getAllProvincias;
const getProvinciaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const provincia = yield provinciaRepository.findOneBy({ id_prov: parseInt(id) });
        if (!provincia)
            return res.status(404).json({ message: 'Provincia no encontrada' });
        return res.json(provincia);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener la provincia' });
    }
});
exports.getProvinciaById = getProvinciaById;
const createProvincia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProvincia = provinciaRepository.create(req.body);
        yield provinciaRepository.save(newProvincia);
        return res.status(201).json(newProvincia);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al crear la provincia' });
    }
});
exports.createProvincia = createProvincia;
const updateProvincia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const provincia = yield provinciaRepository.findOneBy({ id_prov: parseInt(id) });
        if (!provincia)
            return res.status(404).json({ message: 'Provincia no encontrada' });
        provinciaRepository.merge(provincia, req.body);
        yield provinciaRepository.save(provincia);
        return res.json(provincia);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la provincia' });
    }
});
exports.updateProvincia = updateProvincia;
const deleteProvincia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield provinciaRepository.delete({ id_prov: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: 'Provincia no encontrada' });
        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la provincia' });
    }
});
exports.deleteProvincia = deleteProvincia;
