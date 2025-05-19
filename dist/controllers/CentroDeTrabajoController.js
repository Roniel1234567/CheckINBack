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
exports.validarCentro = exports.getCentrosPendientes = exports.existeNombreCentro = exports.getSectoresByCiudad = exports.getCiudadesByProvincia = exports.deleteCentroTrabajo = exports.updateCentroTrabajo = exports.createCentroTrabajo = exports.getCentroTrabajoById = exports.getAllCentrosTrabajo = void 0;
const data_source_1 = require("../data-source");
const CentroDeTrabajo_1 = require("../models/CentroDeTrabajo");
const Direccion_1 = require("../models/Direccion");
const Contacto_1 = require("../models/Contacto");
const Ciudad_1 = require("../models/Ciudad");
const Sector_1 = require("../models/Sector");
const PersonaContactoEmpresa_1 = require("../models/PersonaContactoEmpresa");
const centroTrabajoRepository = data_source_1.AppDataSource.getRepository(CentroDeTrabajo_1.CentroDeTrabajo);
const direccionRepository = data_source_1.AppDataSource.getRepository(Direccion_1.Direccion);
const contactoRepository = data_source_1.AppDataSource.getRepository(Contacto_1.Contacto);
const personaContactoEmpresaRepository = data_source_1.AppDataSource.getRepository(PersonaContactoEmpresa_1.PersonaContactoEmpresa);
const getAllCentrosTrabajo = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const centros = yield centroTrabajoRepository.find({
            relations: [
                'direccion_centro',
                'direccion_centro.sector_dir',
                'direccion_centro.sector_dir.ciudad',
                'direccion_centro.sector_dir.ciudad.provincia',
                'contacto_centro',
                'usuario',
                'persona_contacto_empresa'
            ]
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
            relations: [
                'direccion_centro',
                'direccion_centro.sector_dir',
                'direccion_centro.sector_dir.ciudad',
                'direccion_centro.sector_dir.ciudad.provincia',
                'contacto_centro',
                'usuario',
                'persona_contacto_empresa'
            ]
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
        const nombre_centro = req.body.nombre_centro;
        const direccion = req.body.direccion || req.body.direccion_centro;
        const contacto = req.body.contacto || req.body.contacto_centro;
        if (!nombre_centro || !direccion || !contacto) {
            return res.status(400).json({
                message: 'Faltan datos requeridos',
                required: {
                    nombre_centro: 'string',
                    direccion: {
                        sector_dir: 'number (requerido)',
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
        // Validación de unicidad para nombre_centro
        const existeNombre = yield data_source_1.AppDataSource.getRepository(CentroDeTrabajo_1.CentroDeTrabajo).findOne({ where: { nombre_centro } });
        if (existeNombre) {
            yield queryRunner.rollbackTransaction();
            return res.status(400).json({ message: 'Ya existe un centro de trabajo con ese nombre.' });
        }
        // Validación de unicidad para telefono_contacto
        const existeTelefono = yield data_source_1.AppDataSource.getRepository(Contacto_1.Contacto).findOne({ where: { telefono_contacto: contacto.telefono_contacto } });
        if (existeTelefono) {
            yield queryRunner.rollbackTransaction();
            return res.status(400).json({ message: 'Ya existe un contacto con ese teléfono.' });
        }
        // Validación de unicidad para email_contacto
        const existeCorreo = yield data_source_1.AppDataSource.getRepository(Contacto_1.Contacto).findOne({ where: { email_contacto: contacto.email_contacto } });
        if (existeCorreo) {
            yield queryRunner.rollbackTransaction();
            return res.status(400).json({ message: 'Ya existe un contacto con ese correo electrónico.' });
        }
        const sector = yield data_source_1.AppDataSource.getRepository(Sector_1.Sector).findOne({ where: { id_sec: direccion.sector_dir } });
        if (!sector) {
            yield queryRunner.rollbackTransaction();
            return res.status(400).json({ message: 'Sector no encontrado' });
        }
        const newDireccion = queryRunner.manager.create(Direccion_1.Direccion, {
            sector_dir: sector,
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
            contacto_centro: savedContacto,
            usuario: req.body.id_usu ? { id_usuario: req.body.id_usu } : undefined,
            validacion: req.body.validacion || 'Pendiente'
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
        // Busca el centro con sus relaciones profundas
        const centro = yield centroTrabajoRepository.findOne({
            where: { id_centro: id },
            relations: [
                'direccion_centro',
                'direccion_centro.sector_dir',
                'direccion_centro.sector_dir.ciudad',
                'direccion_centro.sector_dir.ciudad.provincia',
                'contacto_centro',
                'usuario',
                'persona_contacto_empresa'
            ]
        });
        if (!centro) {
            return res.status(404).json({ message: 'Centro de trabajo no encontrado' });
        }
        // Actualiza dirección si viene en el body
        if (req.body.direccion_centro) {
            const dir = centro.direccion_centro;
            if (dir) {
                dir.calle_dir = req.body.direccion_centro.calle_dir || dir.calle_dir;
                dir.num_res_dir = req.body.direccion_centro.num_res_dir || dir.num_res_dir;
                dir.estado_dir = req.body.direccion_centro.estado_dir || dir.estado_dir;
                if (req.body.direccion_centro.sector_dir) {
                    // Busca el sector y lo asigna
                    const sector = yield data_source_1.AppDataSource.getRepository(Sector_1.Sector).findOne({ where: { id_sec: req.body.direccion_centro.sector_dir } });
                    if (sector)
                        dir.sector_dir = sector;
                }
                yield direccionRepository.save(dir);
            }
        }
        // Actualiza contacto si viene en el body
        if (req.body.contacto_centro) {
            const contacto = centro.contacto_centro;
            if (contacto) {
                contacto.telefono_contacto = req.body.contacto_centro.telefono_contacto || contacto.telefono_contacto;
                contacto.email_contacto = req.body.contacto_centro.email_contacto || contacto.email_contacto;
                contacto.estado_contacto = req.body.contacto_centro.estado_contacto || contacto.estado_contacto;
                yield contactoRepository.save(contacto);
            }
        }
        // Actualiza persona de contacto de empresa si viene en el body
        if (req.body.persona_contacto_empresa) {
            // Busca la persona de contacto por el id del centro
            const personaContacto = yield personaContactoEmpresaRepository.findOne({
                where: { centro_trabajo: { id_centro: id } }
            });
            if (personaContacto) {
                personaContacto.nombre_persona_contacto = req.body.persona_contacto_empresa.nombre_persona_contacto || personaContacto.nombre_persona_contacto;
                personaContacto.apellido_persona_contacto = req.body.persona_contacto_empresa.apellido_persona_contacto || personaContacto.apellido_persona_contacto;
                personaContacto.telefono = req.body.persona_contacto_empresa.telefono || personaContacto.telefono;
                personaContacto.extension = req.body.persona_contacto_empresa.extension || personaContacto.extension;
                personaContacto.departamento = req.body.persona_contacto_empresa.departamento || personaContacto.departamento;
                yield personaContactoEmpresaRepository.save(personaContacto);
            }
        }
        // Actualiza los campos simples del centro
        centro.nombre_centro = req.body.nombre_centro || centro.nombre_centro;
        centro.estado_centro = req.body.estado_centro || centro.estado_centro;
        // Actualiza validacion si viene en el body
        if (req.body.validacion) {
            centro.validacion = req.body.validacion;
        }
        // Guarda el centro (sin sobrescribir direccion_centro ni contacto_centro)
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
const existeNombreCentro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.params.nombre;
    if (!nombre) {
        return res.status(400).json({ message: 'Nombre requerido' });
    }
    const existe = yield centroTrabajoRepository.findOne({ where: { nombre_centro: nombre } });
    return res.json({ exists: !!existe });
});
exports.existeNombreCentro = existeNombreCentro;
const getCentrosPendientes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const centros = yield centroTrabajoRepository.find({
            where: { validacion: 'Pendiente' },
            relations: [
                'direccion_centro',
                'direccion_centro.sector_dir',
                'direccion_centro.sector_dir.ciudad',
                'direccion_centro.sector_dir.ciudad.provincia',
                'contacto_centro',
                'usuario',
                'persona_contacto_empresa'
            ]
        });
        return res.json(centros);
    }
    catch (error) {
        console.error('Error al obtener centros pendientes:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getCentrosPendientes = getCentrosPendientes;
const validarCentro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { validacion } = req.body;
        if (isNaN(id) || !validacion) {
            return res.status(400).json({ message: 'ID o validación inválidos' });
        }
        const centro = yield centroTrabajoRepository.findOne({ where: { id_centro: id } });
        if (!centro) {
            return res.status(404).json({ message: 'Centro de trabajo no encontrado' });
        }
        centro.validacion = validacion;
        yield centroTrabajoRepository.save(centro);
        return res.status(200).json({ message: 'Centro validado correctamente', centro });
    }
    catch (error) {
        console.error('Error al validar centro de trabajo:', error);
        return res.status(500).json({ message: 'Error interno al validar centro de trabajo' });
    }
});
exports.validarCentro = validarCentro;
