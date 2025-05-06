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
const express_1 = require("express");
const Ciudadcontrollers_1 = require("../controllers/Ciudadcontrollers");
const router = (0, express_1.Router)();
// Get all ciudades
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, Ciudadcontrollers_1.getAllCiudades)(req, res);
    }
    catch (error) {
        console.error('Error getting ciudades:', error);
        res.status(500).json({
            message: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}));
// Get ciudad by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, Ciudadcontrollers_1.getCiudadById)(req, res);
    }
    catch (error) {
        console.error('Error getting ciudad by ID:', error);
        res.status(500).json({
            message: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}));
// Create new ciudad
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, Ciudadcontrollers_1.createCiudad)(req, res);
    }
    catch (error) {
        console.error('Error creating ciudad:', error);
        res.status(500).json({
            message: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}));
// Update ciudad
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, Ciudadcontrollers_1.updateCiudad)(req, res);
    }
    catch (error) {
        console.error('Error updating ciudad:', error);
        res.status(500).json({
            message: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}));
// Delete ciudad
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, Ciudadcontrollers_1.deleteCiudad)(req, res);
    }
    catch (error) {
        console.error('Error deleting ciudad:', error);
        res.status(500).json({
            message: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}));
// Get ciudades by provincia
router.get('/provincia/:provinciaId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, Ciudadcontrollers_1.getCiudadesByProvincia)(req, res);
    }
    catch (error) {
        console.error('Error getting ciudades by provincia:', error);
        res.status(500).json({
            message: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}));
exports.default = router;
