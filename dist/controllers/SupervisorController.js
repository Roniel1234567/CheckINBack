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
exports.deleteSupervisor = exports.updateSupervisor = exports.createSupervisor = exports.getSupervisorById = exports.getAllSupervisores = void 0;
const data_source_1 = require("../data-source");
const Supervisor_1 = require("../models/Supervisor");
const supervisorRepository = data_source_1.AppDataSource.getRepository(Supervisor_1.Supervisor);
const getAllSupervisores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supervisores = yield supervisorRepository.find();
        return res.json(supervisores);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener los supervisores' });
    }
});
exports.getAllSupervisores = getAllSupervisores;
const getSupervisorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const supervisor = yield supervisorRepository.findOneBy({ id_sup: parseInt(id) });
        if (!supervisor)
            return res.status(404).json({ message: 'Supervisor no encontrado' });
        return res.json(supervisor);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener el supervisor' });
    }
});
exports.getSupervisorById = getSupervisorById;
const createSupervisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSupervisor = supervisorRepository.create(req.body);
        yield supervisorRepository.save(newSupervisor);
        return res.status(201).json(newSupervisor);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al crear el supervisor' });
    }
});
exports.createSupervisor = createSupervisor;
const updateSupervisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const supervisor = yield supervisorRepository.findOneBy({ id_sup: parseInt(id) });
        if (!supervisor)
            return res.status(404).json({ message: 'Supervisor no encontrado' });
        supervisorRepository.merge(supervisor, req.body);
        yield supervisorRepository.save(supervisor);
        return res.json(supervisor);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el supervisor' });
    }
});
exports.updateSupervisor = updateSupervisor;
const deleteSupervisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield supervisorRepository.delete({ id_sup: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: 'Supervisor no encontrado' });
        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el supervisor' });
    }
});
exports.deleteSupervisor = deleteSupervisor;
