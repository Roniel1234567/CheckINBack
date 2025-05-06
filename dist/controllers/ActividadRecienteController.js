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
exports.deleteActividadReciente = exports.updateActividadReciente = exports.createActividadReciente = exports.getActividadRecienteById = exports.getAllActividadesRecientes = void 0;
const data_source_1 = require("../data-source");
const ActividadReciente_1 = require("../models/ActividadReciente");
const actividadRecienteRepository = data_source_1.AppDataSource.getRepository(ActividadReciente_1.ActividadReciente);
const getAllActividadesRecientes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actividadesRecientes = yield actividadRecienteRepository.find();
        return res.status(200).json(actividadesRecientes);
    }
    catch (error) {
        console.error('Error al obtener actividades recientes:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllActividadesRecientes = getAllActividadesRecientes;
const getActividadRecienteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario_act, actividad, entidad_act, registro_act } = req.params;
        const actividadReciente = yield actividadRecienteRepository.findOne({
            where: {
                usuario_act,
                actividad,
                entidad_act,
                registro_act: new Date(registro_act)
            }
        });
        if (!actividadReciente) {
            return res.status(404).json({ message: 'Actividad reciente no encontrada' });
        }
        return res.status(200).json(actividadReciente);
    }
    catch (error) {
        console.error('Error al obtener actividad reciente:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getActividadRecienteById = getActividadRecienteById;
const createActividadReciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newActividadReciente = actividadRecienteRepository.create(req.body);
        const savedActividadReciente = yield actividadRecienteRepository.save(newActividadReciente);
        return res.status(201).json(savedActividadReciente);
    }
    catch (error) {
        console.error('Error al crear actividad reciente:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createActividadReciente = createActividadReciente;
const updateActividadReciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario_act, actividad, entidad_act, registro_act } = req.params;
        const actividadReciente = yield actividadRecienteRepository.findOne({
            where: {
                usuario_act,
                actividad,
                entidad_act,
                registro_act: new Date(registro_act)
            }
        });
        if (!actividadReciente) {
            return res.status(404).json({ message: 'Actividad reciente no encontrada' });
        }
        actividadRecienteRepository.merge(actividadReciente, req.body);
        const updatedActividadReciente = yield actividadRecienteRepository.save(actividadReciente);
        return res.status(200).json(updatedActividadReciente);
    }
    catch (error) {
        console.error('Error al actualizar actividad reciente:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateActividadReciente = updateActividadReciente;
const deleteActividadReciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario_act, actividad, entidad_act, registro_act } = req.params;
        const actividadReciente = yield actividadRecienteRepository.findOne({
            where: {
                usuario_act,
                actividad,
                entidad_act,
                registro_act: new Date(registro_act)
            }
        });
        if (!actividadReciente) {
            return res.status(404).json({ message: 'Actividad reciente no encontrada' });
        }
        yield actividadRecienteRepository.remove(actividadReciente);
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error al eliminar actividad reciente:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteActividadReciente = deleteActividadReciente;
