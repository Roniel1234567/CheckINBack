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
exports.deleteTutor = exports.updateTutor = exports.createTutor = exports.getTutorById = exports.getAllTutores = void 0;
const data_source_1 = require("../data-source");
const Tutor_1 = require("../models/Tutor");
const tutorRepository = data_source_1.AppDataSource.getRepository(Tutor_1.Tutor);
const getAllTutores = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutores = yield tutorRepository.find({
            relations: ['usuario_tutor', 'contacto_tutor']
        });
        return res.status(200).json(tutores);
    }
    catch (error) {
        console.error('Error al obtener tutores:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllTutores = getAllTutores;
const getTutorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const tutor = yield tutorRepository.findOne({
            where: { id_tutor: id },
            relations: ['usuario_tutor', 'contacto_tutor']
        });
        if (!tutor) {
            return res.status(404).json({ message: 'Tutor no encontrado' });
        }
        return res.status(200).json(tutor);
    }
    catch (error) {
        console.error('Error al obtener tutor:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getTutorById = getTutorById;
const createTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTutor = tutorRepository.create(req.body);
        const savedTutor = yield tutorRepository.save(newTutor);
        return res.status(201).json(savedTutor);
    }
    catch (error) {
        console.error('Error al crear tutor:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createTutor = createTutor;
const updateTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const tutor = yield tutorRepository.findOne({
            where: { id_tutor: id }
        });
        if (!tutor) {
            return res.status(404).json({ message: 'Tutor no encontrado' });
        }
        tutorRepository.merge(tutor, req.body);
        const updatedTutor = yield tutorRepository.save(tutor);
        return res.status(200).json(updatedTutor);
    }
    catch (error) {
        console.error('Error al actualizar tutor:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateTutor = updateTutor;
const deleteTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const result = yield tutorRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Tutor no encontrado' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar tutor:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteTutor = deleteTutor;
