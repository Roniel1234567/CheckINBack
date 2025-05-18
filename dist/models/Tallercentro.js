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
exports.TallerCentro = void 0;
const typeorm_1 = require("typeorm");
const Taller_1 = require("./Taller");
const CentroDeTrabajo_1 = require("./CentroDeTrabajo");
let TallerCentro = class TallerCentro {
};
exports.TallerCentro = TallerCentro;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], TallerCentro.prototype, "id_taller", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], TallerCentro.prototype, "id_centro", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Taller_1.Taller, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_taller' }),
    __metadata("design:type", Taller_1.Taller)
], TallerCentro.prototype, "taller", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CentroDeTrabajo_1.CentroDeTrabajo, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_centro' }),
    __metadata("design:type", CentroDeTrabajo_1.CentroDeTrabajo)
], TallerCentro.prototype, "centro", void 0);
exports.TallerCentro = TallerCentro = __decorate([
    (0, typeorm_1.Entity)('taller_centro')
], TallerCentro);
