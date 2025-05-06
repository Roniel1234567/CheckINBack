"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ciudad = void 0;
const typeorm_1 = require("typeorm");
const Provincia_1 = require("./Provincia");
let Ciudad = class Ciudad {
};
exports.Ciudad = Ciudad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_ciu' }),
    __metadata("design:type", Number)
], Ciudad.prototype, "id_ciu", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Ciudad.prototype, "ciudad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'provincia_ciu' }),
    __metadata("design:type", Number)
], Ciudad.prototype, "provincia_ciu", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Provincia_1.Provincia, (provincia) => provincia.ciudades),
    (0, typeorm_1.JoinColumn)({ name: 'provincia_ciu' }),
    __metadata("design:type", Provincia_1.Provincia)
], Ciudad.prototype, "provincia", void 0);
exports.Ciudad = Ciudad = __decorate([
    (0, typeorm_1.Entity)('ciudad')
], Ciudad);
