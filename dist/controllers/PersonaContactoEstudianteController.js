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
exports.getPersonaContactoEstByDocumento = exports.deletePersonaContactoEst = exports.updatePersonaContactoEst = exports.createPersonaContactoEst = exports.getPersonaContactoEstById = exports.getAllPersonaContactosEst = void 0;
const data_source_1 = require("../data-source");
const PersonaContactoEstudiante_1 = require("../models/PersonaContactoEstudiante");
const personaContactoRepository = data_source_1.AppDataSource.getRepository(PersonaContactoEstudiante_1.PersonaContactoEstudiante);
const getAllPersonaContactosEst = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactos = yield personaContactoRepository.find({ relations: ['estudiante'] });
        return res.json(contactos);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener los contactos de estudiante' });
    }
});
exports.getAllPersonaContactosEst = getAllPersonaContactosEst;
const getPersonaContactoEstById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const contacto = yield personaContactoRepository.findOne({
            where: { id_contacto_estudiante: Number(id) },
            relations: ['estudiante']
        });
        if (!contacto)
            return res.status(404).json({ message: 'Contacto no encontrado' });
        return res.json(contacto);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener el contacto de estudiante' });
    }
});
exports.getPersonaContactoEstById = getPersonaContactoEstById;
const createPersonaContactoEst = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        // Mapear estudiante a objeto si es id
        if (data.estudiante) {
            data.estudiante = { documento_id_est: data.estudiante };
        }
        const nuevoContacto = personaContactoRepository.create(data);
        yield personaContactoRepository.save(nuevoContacto);
        return res.status(201).json(nuevoContacto);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al crear el contacto de estudiante' });
    }
});
exports.createPersonaContactoEst = createPersonaContactoEst;
const updatePersonaContactoEst = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const contacto = yield personaContactoRepository.findOne({ where: { id_contacto_estudiante: Number(id) } });
        if (!contacto)
            return res.status(404).json({ message: 'Contacto no encontrado' });
        personaContactoRepository.merge(contacto, req.body);
        yield personaContactoRepository.save(contacto);
        return res.json(contacto);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el contacto de estudiante' });
    }
});
exports.updatePersonaContactoEst = updatePersonaContactoEst;
const deletePersonaContactoEst = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield personaContactoRepository.delete({ id_contacto_estudiante: Number(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: 'Contacto no encontrado' });
        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el contacto de estudiante' });
    }
});
exports.deletePersonaContactoEst = deletePersonaContactoEst;
const getPersonaContactoEstByDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documento = req.params.documento;
        // Busca el contacto por el documento del estudiante
        const contacto = yield personaContactoRepository.findOne({
            where: { estudiante: { documento_id_est: documento } },
            relations: ['estudiante']
        });
        if (!contacto) {
            return res.status(404).json({ message: 'No se encontró persona de contacto para este estudiante' });
        }
        return res.json(contacto);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al buscar el contacto por documento de estudiante' });
    }
});
exports.getPersonaContactoEstByDocumento = getPersonaContactoEstByDocumento;
