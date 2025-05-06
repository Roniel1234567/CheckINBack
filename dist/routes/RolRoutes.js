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
const RolController_1 = require("../controllers/RolController");
const router = (0, express_1.Router)();
// Get all roles
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, RolController_1.getAllRoles)(req, res);
}));
// Get role by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, RolController_1.getRolById)(req, res);
}));
// Create new role
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, RolController_1.createRol)(req, res);
}));
// Update role
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, RolController_1.updateRol)(req, res);
}));
// Delete role
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, RolController_1.deleteRol)(req, res);
}));
exports.default = router;
