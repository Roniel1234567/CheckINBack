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
exports.deleteCicloEscolar = exports.updateCicloEscolar = exports.createCicloEscolar = exports.getCicloEscolarById = exports.getAllCiclosEscolares = void 0;
const data_source_1 = require("../data-source");
const CicloEscolar_1 = require("../models/CicloEscolar");
const cicloEscolarRepository = data_source_1.AppDataSource.getRepository(CicloEscolar_1.CicloEscolar);
const getAllCiclosEscolares = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ciclos = yield cicloEscolarRepository.find();
        return res.json(ciclos);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener los ciclos escolares' });
    }
});
exports.getAllCiclosEscolares = getAllCiclosEscolares;
const getCicloEscolarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const ciclo = yield cicloEscolarRepository.findOneBy({ id_ciclo: parseInt(id) });
        if (!ciclo)
            return res.status(404).json({ message: 'Ciclo escolar no encontrado' });
        return res.json(ciclo);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener el ciclo escolar' });
    }
});
exports.getCicloEscolarById = getCicloEscolarById;
const createCicloEscolar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCiclo = cicloEscolarRepository.create(req.body);
        yield cicloEscolarRepository.save(newCiclo);
        return res.status(201).json(newCiclo);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al crear el ciclo escolar' });
    }
});
exports.createCicloEscolar = createCicloEscolar;
const updateCicloEscolar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const ciclo = yield cicloEscolarRepository.findOneBy({ id_ciclo: parseInt(id) });
        if (!ciclo)
            return res.status(404).json({ message: 'Ciclo escolar no encontrado' });
        cicloEscolarRepository.merge(ciclo, req.body);
        yield cicloEscolarRepository.save(ciclo);
        return res.json(ciclo);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el ciclo escolar' });
    }
});
exports.updateCicloEscolar = updateCicloEscolar;
const deleteCicloEscolar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield cicloEscolarRepository.delete({ id_ciclo: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: 'Ciclo escolar no encontrado' });
        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el ciclo escolar' });
    }
});
exports.deleteCicloEscolar = deleteCicloEscolar;
