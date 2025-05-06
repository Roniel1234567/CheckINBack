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
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Get all users
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userController_1.getAllUsers)(req, res);
}));
// Get user by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userController_1.getUserById)(req, res);
}));
// Create new user
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userController_1.createUser)(req, res);
}));
// Update user
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userController_1.updateUser)(req, res);
}));
// Delete user
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userController_1.deleteUser)(req, res);
}));
exports.default = router;
