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
exports.existeEmailContacto = exports.existeTelefonoContacto = exports.deleteContacto = exports.updateContacto = exports.createContacto = exports.getContactoById = exports.getAllContactos = void 0;
const data_source_1 = require("../data-source");
const Contacto_1 = require("../models/Contacto");
const contactoRepository = data_source_1.AppDataSource.getRepository(Contacto_1.Contacto);
const getAllContactos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactos = yield contactoRepository.find();
        return res.json(contactos);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener los contactos' });
    }
});
exports.getAllContactos = getAllContactos;
const getContactoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const contacto = yield contactoRepository.findOneBy({ id_contacto: parseInt(id) });
        if (!contacto)
            return res.status(404).json({ message: 'Contacto no encontrado' });
        return res.json(contacto);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener el contacto' });
    }
});
exports.getContactoById = getContactoById;
const createContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newContacto = contactoRepository.create(req.body);
        yield contactoRepository.save(newContacto);
        return res.status(201).json(newContacto);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al crear el contacto' });
    }
});
exports.createContacto = createContacto;
const updateContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const contacto = yield contactoRepository.findOneBy({ id_contacto: parseInt(id) });
        if (!contacto)
            return res.status(404).json({ message: 'Contacto no encontrado' });
        contactoRepository.merge(contacto, req.body);
        yield contactoRepository.save(contacto);
        return res.json(contacto);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el contacto' });
    }
});
exports.updateContacto = updateContacto;
const deleteContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield contactoRepository.delete({ id_contacto: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: 'Contacto no encontrado' });
        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el contacto' });
    }
});
exports.deleteContacto = deleteContacto;
const existeTelefonoContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const telefono = req.params.telefono;
    if (!telefono) {
        return res.status(400).json({ message: 'Teléfono requerido' });
    }
    const existe = yield contactoRepository.findOne({ where: { telefono_contacto: telefono } });
    return res.json({ exists: !!existe });
});
exports.existeTelefonoContacto = existeTelefonoContacto;
const existeEmailContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    if (!email) {
        return res.status(400).json({ message: 'Email requerido' });
    }
    const existe = yield contactoRepository.findOne({ where: { email_contacto: email } });
    return res.json({ exists: !!existe });
});
exports.existeEmailContacto = existeEmailContacto;
