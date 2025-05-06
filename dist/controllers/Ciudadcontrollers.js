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
exports.getCiudadesByProvincia = exports.deleteCiudad = exports.updateCiudad = exports.createCiudad = exports.getCiudadById = exports.getAllCiudades = void 0;
const data_source_1 = require("../data-source");
const Ciudad_1 = require("../models/Ciudad");
const ciudadRepository = data_source_1.AppDataSource.getRepository(Ciudad_1.Ciudad);
const getAllCiudades = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ciudades = yield ciudadRepository.find({
            relations: ['provincia']
        });
        return res.status(200).json(ciudades);
    }
    catch (error) {
        console.error('Error getting ciudades:', error);
        return res.status(500).json({
            message: 'Error getting ciudades',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getAllCiudades = getAllCiudades;
const getCiudadById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const ciudad = yield ciudadRepository.findOne({
            where: { id_ciu: parseInt(id) },
            relations: ['provincia_ciu']
        });
        if (!ciudad) {
            return res.status(404).json({
                message: 'Ciudad not found'
            });
        }
        return res.json(ciudad);
    }
    catch (error) {
        console.error('Error getting ciudad:', error);
        return res.status(500).json({
            message: 'Error getting ciudad',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getCiudadById = getCiudadById;
const createCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCiudad = ciudadRepository.create(req.body);
        const savedCiudad = yield ciudadRepository.save(newCiudad);
        return res.status(201).json(savedCiudad);
    }
    catch (error) {
        console.error('Error al crear ciudad:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createCiudad = createCiudad;
const updateCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const ciudad = yield ciudadRepository.findOne({
            where: { id_ciu: id }
        });
        if (!ciudad) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }
        ciudadRepository.merge(ciudad, req.body);
        const updatedCiudad = yield ciudadRepository.save(ciudad);
        return res.status(200).json(updatedCiudad);
    }
    catch (error) {
        console.error('Error al actualizar ciudad:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateCiudad = updateCiudad;
const deleteCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const result = yield ciudadRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar ciudad:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteCiudad = deleteCiudad;
const getCiudadesByProvincia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provinciaId = parseInt(req.params.provinciaId);
        const ciudades = yield data_source_1.AppDataSource
            .getRepository(Ciudad_1.Ciudad)
            .find({
            where: { provincia_ciu: provinciaId },
            relations: ['provincia']
        });
        return res.json(ciudades);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener ciudades' });
    }
});
exports.getCiudadesByProvincia = getCiudadesByProvincia;
