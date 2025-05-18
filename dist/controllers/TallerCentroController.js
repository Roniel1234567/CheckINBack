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
exports.getCentrosPorTaller = exports.createTallerCentro = void 0;
const data_source_1 = require("../data-source");
const TallerCentro_1 = require("../models/TallerCentro");
const Taller_1 = require("../models/Taller");
const CentroDeTrabajo_1 = require("../models/CentroDeTrabajo");
const tallerCentroRepository = data_source_1.AppDataSource.getRepository(TallerCentro_1.TallerCentro);
// Crear relación taller-centro
const createTallerCentro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    yield queryRunner.startTransaction();
    try {
        const { id_taller, id_centro } = req.body;
        if (!id_taller || !id_centro) {
            return res.status(400).json({
                message: 'Faltan datos requeridos',
                required: {
                    id_taller: 'number',
                    id_centro: 'number'
                }
            });
        }
        // Verificar que el taller existe
        const taller = yield queryRunner.manager.findOne(Taller_1.Taller, {
            where: { id_taller }
        });
        if (!taller) {
            yield queryRunner.rollbackTransaction();
            return res.status(400).json({ message: 'Taller no encontrado' });
        }
        // Verificar que el centro existe
        const centro = yield queryRunner.manager.findOne(CentroDeTrabajo_1.CentroDeTrabajo, {
            where: { id_centro }
        });
        if (!centro) {
            yield queryRunner.rollbackTransaction();
            return res.status(400).json({ message: 'Centro de trabajo no encontrado' });
        }
        // Verificar que la relación no existe
        const relacionExistente = yield queryRunner.manager.findOne(TallerCentro_1.TallerCentro, {
            where: { id_taller, id_centro }
        });
        if (relacionExistente) {
            yield queryRunner.rollbackTransaction();
            return res.status(400).json({ message: 'Esta relación ya existe' });
        }
        const nuevaRelacion = queryRunner.manager.create(TallerCentro_1.TallerCentro, {
            id_taller,
            id_centro
        });
        yield queryRunner.manager.save(TallerCentro_1.TallerCentro, nuevaRelacion);
        yield queryRunner.commitTransaction();
        return res.status(201).json({
            message: 'Relación creada correctamente',
            data: nuevaRelacion
        });
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        console.error('Error al crear relación taller-centro:', error);
        return res.status(500).json({
            message: 'Error al crear la relación',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
    finally {
        yield queryRunner.release();
    }
});
exports.createTallerCentro = createTallerCentro;
// Obtener empresas por taller
const getCentrosPorTaller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_taller = parseInt(req.params.id_taller);
        if (isNaN(id_taller)) {
            return res.status(400).json({ message: 'ID de taller inválido' });
        }
        // Verificar que el taller existe
        const taller = yield data_source_1.AppDataSource.getRepository(Taller_1.Taller).findOne({
            where: { id_taller: id_taller.toString() }
        });
        if (!taller) {
            return res.status(404).json({ message: 'Taller no encontrado' });
        }
        const relaciones = yield tallerCentroRepository.find({
            where: { id_taller },
            relations: ['centro']
        });
        const centros = relaciones.map(rel => rel.centro);
        return res.json(centros);
    }
    catch (error) {
        console.error('Error al obtener centros por taller:', error);
        return res.status(500).json({
            message: 'Error al obtener los centros',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
exports.getCentrosPorTaller = getCentrosPorTaller;
