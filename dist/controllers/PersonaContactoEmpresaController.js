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
exports.deletePersonaContacto = exports.updatePersonaContacto = exports.createPersonaContacto = exports.getPersonaContactoByCentro = exports.getPersonaContactoById = exports.getAllPersonaContactos = void 0;
const data_source_1 = require("../data-source");
const PersonaContactoEmpresa_1 = require("../models/PersonaContactoEmpresa");
const personaContactoRepository = data_source_1.AppDataSource.getRepository(PersonaContactoEmpresa_1.PersonaContactoEmpresa);
const getAllPersonaContactos = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactos = yield personaContactoRepository.find({ relations: ['centro_trabajo'] });
        return res.json(contactos);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener los contactos de persona' });
    }
});
exports.getAllPersonaContactos = getAllPersonaContactos;
const getPersonaContactoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const contacto = yield personaContactoRepository.findOne({
            where: { id_persona_contacto: Number(id) },
            relations: ['centro_trabajo']
        });
        if (!contacto)
            return res.status(404).json({ message: 'Contacto no encontrado' });
        return res.json(contacto);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener el contacto de persona' });
    }
});
exports.getPersonaContactoById = getPersonaContactoById;
const getPersonaContactoByCentro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idCentro = Number(req.params.idCentro);
        if (isNaN(idCentro)) {
            return res.status(400).json({ message: 'ID de centro inválido' });
        }
        const contacto = yield personaContactoRepository.findOne({
            where: { centro_trabajo: { id_centro: idCentro } },
            relations: ['centro_trabajo']
        });
        if (!contacto)
            return res.status(404).json({ message: 'Contacto no encontrado' });
        return res.json(contacto);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener el contacto de persona por centro' });
    }
});
exports.getPersonaContactoByCentro = getPersonaContactoByCentro;
const createPersonaContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('BODY RECIBIDO:', req.body);
    try {
        const data = req.body;
        // Mapear centro_trabajo a objeto si es id
        if (data.centro_trabajo) {
            data.centro_trabajo = { id_centro: data.centro_trabajo };
        }
        const nuevoContacto = personaContactoRepository.create(data);
        yield personaContactoRepository.save(nuevoContacto);
        return res.status(201).json(nuevoContacto);
    }
    catch (error) {
        console.error('ERROR AL CREAR PERSONA CONTACTO:', error);
        return res.status(500).json({ message: 'Error al crear el contacto de persona', error: error instanceof Error ? error.message : error });
    }
});
exports.createPersonaContacto = createPersonaContacto;
const updatePersonaContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const contacto = yield personaContactoRepository.findOne({ where: { id_persona_contacto: Number(id) } });
        if (!contacto)
            return res.status(404).json({ message: 'Contacto no encontrado' });
        personaContactoRepository.merge(contacto, req.body);
        yield personaContactoRepository.save(contacto);
        return res.json(contacto);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el contacto de persona' });
    }
});
exports.updatePersonaContacto = updatePersonaContacto;
const deletePersonaContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield personaContactoRepository.delete({ id_persona_contacto: Number(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: 'Contacto no encontrado' });
        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el contacto de persona' });
    }
});
exports.deletePersonaContacto = deletePersonaContacto;
