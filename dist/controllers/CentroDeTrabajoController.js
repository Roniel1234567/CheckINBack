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
exports.getSectoresByCiudad = exports.getCiudadesByProvincia = exports.deleteCentroTrabajo = exports.updateCentroTrabajo = exports.createCentroTrabajo = exports.getCentroTrabajoById = exports.getAllCentrosTrabajo = void 0;
const data_source_1 = require("../data-source");
const CentroDeTrabajo_1 = require("../models/CentroDeTrabajo");
const Direccion_1 = require("../models/Direccion");
const Contacto_1 = require("../models/Contacto");
const Ciudad_1 = require("../models/Ciudad");
const Sector_1 = require("../models/Sector");
const centroTrabajoRepository = data_source_1.AppDataSource.getRepository(CentroDeTrabajo_1.CentroDeTrabajo);
const direccionRepository = data_source_1.AppDataSource.getRepository(Direccion_1.Direccion);
const contactoRepository = data_source_1.AppDataSource.getRepository(Contacto_1.Contacto);
const getAllCentrosTrabajo = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const centros = yield centroTrabajoRepository.find({
            relations: ['direccion_centro', 'contacto_centro']
        });
        return res.json(centros);
    }
    catch (error) {
        console.error('Error al obtener centros de trabajo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllCentrosTrabajo = getAllCentrosTrabajo;
const getCentroTrabajoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const centro = yield centroTrabajoRepository.findOne({
            where: { id_centro: id },
            relations: ['direccion_centro', 'contacto_centro']
        });
        if (!centro) {
            return res.status(404).json({ message: 'Centro de trabajo no encontrado' });
        }
        return res.status(200).json(centro);
    }
    catch (error) {
        console.error('Error al obtener centro de trabajo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getCentroTrabajoById = getCentroTrabajoById;
const createCentroTrabajo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    yield queryRunner.startTransaction();
    try {
        const { nombre_centro, direccion, contacto } = req.body;
        if (!nombre_centro || !direccion || !contacto) {
            return res.status(400).json({
                message: 'Faltan datos requeridos',
                required: {
                    nombre_centro: 'string',
                    direccion: {
                        sector_dir: 'number',
                        calle_dir: 'string',
                        num_res_dir: 'string'
                    },
                    contacto: {
                        telefono_contacto: 'string',
                        email_contacto: 'string'
                    }
                }
            });
        }
        const newDireccion = queryRunner.manager.create(Direccion_1.Direccion, {
            sector_dir: direccion.sector_dir,
            calle_dir: direccion.calle_dir,
            num_res_dir: direccion.num_res_dir,
            estado_dir: 'Activo'
        });
        const savedDireccion = yield queryRunner.manager.save(Direccion_1.Direccion, newDireccion);
        const newContacto = queryRunner.manager.create(Contacto_1.Contacto, {
            telefono_contacto: contacto.telefono_contacto,
            email_contacto: contacto.email_contacto,
            estado_contacto: 'Activo'
        });
        const savedContacto = yield queryRunner.manager.save(Contacto_1.Contacto, newContacto);
        const newCentro = queryRunner.manager.create(CentroDeTrabajo_1.CentroDeTrabajo, {
            nombre_centro,
            estado_centro: 'Activo',
            direccion_centro: savedDireccion,
            contacto_centro: savedContacto
        });
        const savedCentro = yield queryRunner.manager.save(CentroDeTrabajo_1.CentroDeTrabajo, newCentro);
        yield queryRunner.commitTransaction();
        return res.status(201).json(savedCentro);
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        console.error('Error al crear centro de trabajo:', error);
        return res.status(500).json({
            message: 'Error al crear el centro de trabajo',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
    finally {
        yield queryRunner.release();
    }
});
exports.createCentroTrabajo = createCentroTrabajo;
const updateCentroTrabajo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const centro = yield centroTrabajoRepository.findOne({
            where: { id_centro: id }
        });
        if (!centro) {
            return res.status(404).json({ message: 'Centro de trabajo no encontrado' });
        }
        centroTrabajoRepository.merge(centro, req.body);
        const updatedCentro = yield centroTrabajoRepository.save(centro);
        return res.status(200).json(updatedCentro);
    }
    catch (error) {
        console.error('Error al actualizar centro de trabajo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateCentroTrabajo = updateCentroTrabajo;
const deleteCentroTrabajo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const result = yield centroTrabajoRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Centro de trabajo no encontrado' });
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar centro de trabajo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteCentroTrabajo = deleteCentroTrabajo;
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
        console.error('Error al obtener ciudades:', error);
        return res.status(500).json({ message: 'Error al obtener ciudades' });
    }
});
exports.getCiudadesByProvincia = getCiudadesByProvincia;
const getSectoresByCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ciudadId = parseInt(req.params.ciudadId);
        const sectores = yield data_source_1.AppDataSource
            .getRepository(Sector_1.Sector)
            .find({
            where: { ciudad_sec: ciudadId }
        });
        return res.json(sectores);
    }
    catch (error) {
        console.error('Error al obtener sectores:', error);
        return res.status(500).json({ message: 'Error al obtener sectores' });
    }
});
exports.getSectoresByCiudad = getSectoresByCiudad;
