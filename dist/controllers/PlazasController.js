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
exports.deletePlaza = exports.updatePlaza = exports.createPlaza = exports.getPlazaById = exports.getAllPlazas = void 0;
const data_source_1 = require("../data-source");
const Plazas_1 = require("../models/Plazas");
const plazasRepository = data_source_1.AppDataSource.getRepository(Plazas_1.PlazasCentro);
const getAllPlazas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plazas = yield plazasRepository.find({
            relations: ['centro_plaza', 'taller_plaza']
        });
        return res.status(200).json(plazas);
    }
    catch (error) {
        console.error('Error al obtener plazas:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllPlazas = getAllPlazas;
const getPlazaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const plaza = yield plazasRepository.findOne({
            where: { id_plaza: id },
            relations: ['centro_plaza', 'taller_plaza']
        });
        if (!plaza) {
            return res.status(404).json({ message: 'Plaza no encontrada' });
        }
        return res.status(200).json(plaza);
    }
    catch (error) {
        console.error('Error al obtener plaza:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getPlazaById = getPlazaById;
const createPlaza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPlaza = plazasRepository.create(Object.assign(Object.assign({}, req.body), { creacion_plaza: new Date() }));
        const savedPlaza = yield plazasRepository.save(newPlaza);
        return res.status(201).json(savedPlaza);
    }
    catch (error) {
        console.error('Error al crear plaza:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createPlaza = createPlaza;
const updatePlaza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const plaza = yield plazasRepository.findOne({
            where: { id_plaza: id }
        });
        if (!plaza) {
            return res.status(404).json({ message: 'Plaza no encontrada' });
        }
        plazasRepository.merge(plaza, req.body);
        const updatedPlaza = yield plazasRepository.save(plaza);
        return res.status(200).json(updatedPlaza);
    }
    catch (error) {
        console.error('Error al actualizar plaza:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updatePlaza = updatePlaza;
const deletePlaza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const result = yield plazasRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Plaza no encontrada' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar plaza:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deletePlaza = deletePlaza;
