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
exports.updateEstudiantePoliza = exports.updateFecha = exports.deleteEstudiante = exports.updateEstudiante = exports.createEstudiante = exports.getEstudianteById = exports.getAllEstudiantes = void 0;
const data_source_1 = require("../data-source");
const Estudiante_1 = require("../models/Estudiante");
const DocEstudiante_1 = require("../models/DocEstudiante");
const Poliza_1 = require("../models/Poliza");
const CentroDeTrabajo_1 = require("../models/CentroDeTrabajo");
const estudianteRepository = data_source_1.AppDataSource.getRepository(Estudiante_1.Estudiante);
const polizaRepository = data_source_1.AppDataSource.getRepository(Poliza_1.Poliza);
const centroTrabajoRepository = data_source_1.AppDataSource.getRepository(CentroDeTrabajo_1.CentroDeTrabajo);
const getAllEstudiantes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudiantes = yield estudianteRepository.find({
            relations: ['usuario_est', 'contacto_est', 'taller_est', 'direccion_id', 'ciclo_escolar_est', 'poliza']
        });
        const estudiantesConNacionalidad = estudiantes.map(est => (Object.assign(Object.assign({}, est), { nacionalidad: est.nacionalidad || null })));
        return res.status(200).json(estudiantesConNacionalidad);
    }
    catch (error) {
        console.error('Error al obtener estudiantes:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllEstudiantes = getAllEstudiantes;
const getEstudianteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const estudiante = yield estudianteRepository.findOne({
            where: { documento_id_est: id },
            relations: ['usuario_est', 'contacto_est', 'taller_est', 'direccion_id', 'ciclo_escolar_est', 'poliza']
        });
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        return res.status(200).json(Object.assign(Object.assign({}, estudiante), { nacionalidad: estudiante.nacionalidad || null }));
    }
    catch (error) {
        console.error('Error al obtener estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getEstudianteById = getEstudianteById;
const createEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('BODY QUE LLEGA:', req.body);
    try {
        const estudianteData = req.body;
        // Mapea los campos relacionales a objetos con id
        if (estudianteData.usuario_est)
            estudianteData.usuario_est = { id_usuario: Number(estudianteData.usuario_est) };
        if (estudianteData.contacto_est)
            estudianteData.contacto_est = { id_contacto: Number(estudianteData.contacto_est) };
        if (estudianteData.taller_est)
            estudianteData.taller_est = { id_taller: Number(estudianteData.taller_est) };
        if (estudianteData.direccion_id)
            estudianteData.direccion_id = { id_dir: Number(estudianteData.direccion_id) };
        if (estudianteData.ciclo_escolar_est)
            estudianteData.ciclo_escolar_est = { id_ciclo: Number(estudianteData.ciclo_escolar_est) };
        if (estudianteData.id_poliza)
            estudianteData.poliza = { id_poliza: Number(estudianteData.id_poliza) };
        // Validar campos requeridos
        const camposRequeridos = ['documento_id_est', 'nombre_est', 'apellido_est', 'fecha_nac_est'];
        const camposFaltantes = camposRequeridos.filter(campo => !estudianteData[campo]);
        if (camposFaltantes.length > 0) {
            return res.status(400).json({
                message: 'Campos requeridos faltantes',
                campos: camposFaltantes
            });
        }
        // Validar y limpiar el campo documento_id_est
        if (typeof estudianteData.documento_id_est !== 'string' || !estudianteData.documento_id_est.trim()) {
            return res.status(400).json({ message: 'El campo documento_id_est es obligatorio y no puede estar vacío.' });
        }
        estudianteData.documento_id_est = estudianteData.documento_id_est.trim();
        // Verificar si el estudiante ya existe
        const estudianteExistente = yield estudianteRepository.findOne({
            where: { documento_id_est: estudianteData.documento_id_est }
        });
        if (estudianteExistente) {
            return res.status(400).json({ message: 'Ya existe un estudiante con este documento' });
        }
        const estudiante = yield estudianteRepository.save(estudianteData);
        const documentoId = (_a = estudiante.documento_id_est) === null || _a === void 0 ? void 0 : _a.trim();
        if (!documentoId) {
            throw new Error('El documento del estudiante no puede estar vacío');
        }
        const docEstudianteRepository = data_source_1.AppDataSource.getRepository(DocEstudiante_1.DocEstudiante);
        const docEstudianteExistente = yield docEstudianteRepository.findOne({
            where: { est_doc: documentoId }
        });
        if (!docEstudianteExistente) {
            const nuevoDocEstudiante = docEstudianteRepository.create({
                est_doc: documentoId
            });
            yield docEstudianteRepository.save(nuevoDocEstudiante);
        }
        return res.status(201).json({
            message: 'Estudiante creado exitosamente',
            estudiante
        });
    }
    catch (error) {
        console.error('Error al crear estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createEstudiante = createEstudiante;
const updateEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('ENTRANDO A updateEstudiante', req.originalUrl, req.body);
    try {
        const { id } = req.params;
        const estudianteData = req.body;
        if (estudianteData.id_poliza)
            estudianteData.poliza = { id_poliza: Number(estudianteData.id_poliza) };
        const estudiante = yield estudianteRepository.findOne({
            where: { documento_id_est: id }
        });
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        // Actualizar solo los campos proporcionados
        Object.assign(estudiante, estudianteData);
        yield estudianteRepository.save(estudiante);
        return res.status(200).json({
            message: 'Estudiante actualizado exitosamente',
            estudiante
        });
    }
    catch (error) {
        console.error('Error al actualizar estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateEstudiante = updateEstudiante;
const deleteEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const estudiante = yield estudianteRepository.findOne({
            where: { documento_id_est: id }
        });
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        yield estudianteRepository.remove(estudiante);
        return res.status(200).json({
            message: 'Estudiante eliminado exitosamente'
        });
    }
    catch (error) {
        console.error('Error al eliminar estudiante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteEstudiante = deleteEstudiante;
const updateFecha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('ENTRANDO A updateFecha', req.originalUrl, req.body);
    const documento_id_est = req.params.id;
    const { fecha_inicio_pasantia, fecha_fin_pasantia, horaspasrealizadas_est } = req.body;
    try {
        const result = yield estudianteRepository.update({ documento_id_est }, { fecha_inicio_pasantia, fecha_fin_pasantia, horaspasrealizadas_est });
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        // Devuelve el estudiante actualizado
        const estudiante = yield estudianteRepository.findOne({ where: { documento_id_est } });
        return res.json(estudiante);
    }
    catch (error) {
        console.error('Error al actualizar fechas:', error);
        return res.status(500).json({ message: 'Error interno al actualizar fechas' });
    }
});
exports.updateFecha = updateFecha;
const updateEstudiantePoliza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { id_poliza } = req.body;
        // Solo actualiza el campo poliza (id_poliza) en la tabla estudiante
        const result = yield estudianteRepository.update({ documento_id_est: id }, { poliza: id_poliza ? { id_poliza: Number(id_poliza) } : undefined });
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        // Devuelve el estudiante actualizado
        const estudiante = yield estudianteRepository.findOne({ where: { documento_id_est: id }, relations: ['poliza'] });
        return res.status(200).json({
            message: 'Póliza asignada correctamente',
            estudiante
        });
    }
    catch (error) {
        console.error('Error al actualizar póliza del estudiante:', error);
        return res.status(500).json({ message: 'Error interno al actualizar póliza' });
    }
});
exports.updateEstudiantePoliza = updateEstudiantePoliza;
