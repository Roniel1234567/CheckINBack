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
exports.getSectoresByCiudad = exports.deleteSector = exports.updateSector = exports.createSector = exports.getSectorById = exports.getAllSectores = void 0;
const data_source_1 = require("../data-source");
const Sector_1 = require("../models/Sector");
const sectorRepository = data_source_1.AppDataSource.getRepository(Sector_1.Sector);
const getAllSectores = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sectores = yield sectorRepository.find({
            relations: ['ciudad']
        });
        return res.json(sectores);
    }
    catch (error) {
        console.error('Error getting sectores:', error);
        return res.status(500).json({ message: 'Error al obtener sectores' });
    }
});
exports.getAllSectores = getAllSectores;
const getSectorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const sector = yield sectorRepository.findOne({
            where: { id_sec: parseInt(id) },
            relations: ['ciudad']
        });
        if (!sector) {
            return res.status(404).json({ message: 'Sector no encontrado' });
        }
        return res.json(sector);
    }
    catch (error) {
        console.error('Error getting sector:', error);
        return res.status(500).json({ message: 'Error al obtener sector' });
    }
});
exports.getSectorById = getSectorById;
const createSector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sector = sectorRepository.create(req.body);
        const result = yield sectorRepository.save(sector);
        return res.status(201).json(result);
    }
    catch (error) {
        console.error('Error creating sector:', error);
        return res.status(500).json({ message: 'Error al crear sector' });
    }
});
exports.createSector = createSector;
const updateSector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const sector = yield sectorRepository.findOne({
            where: { id_sec: parseInt(id) }
        });
        if (!sector) {
            return res.status(404).json({ message: 'Sector no encontrado' });
        }
        sectorRepository.merge(sector, req.body);
        const result = yield sectorRepository.save(sector);
        return res.json(result);
    }
    catch (error) {
        console.error('Error updating sector:', error);
        return res.status(500).json({ message: 'Error al actualizar sector' });
    }
});
exports.updateSector = updateSector;
const deleteSector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield sectorRepository.delete(parseInt(id));
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Sector no encontrado' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting sector:', error);
        return res.status(500).json({ message: 'Error al eliminar sector' });
    }
});
exports.deleteSector = deleteSector;
const getSectoresByCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ciudadId } = req.params;
        const sectores = yield sectorRepository.find({
            where: { ciudad_sec: parseInt(ciudadId) },
            relations: ['ciudad']
        });
        return res.json(sectores);
    }
    catch (error) {
        console.error('Error getting sectores by ciudad:', error);
        return res.status(500).json({ message: 'Error al obtener sectores por ciudad' });
    }
});
exports.getSectoresByCiudad = getSectoresByCiudad;
