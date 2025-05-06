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
exports.ActividadReciente = void 0;
const typeorm_1 = require("typeorm");
let ActividadReciente = class ActividadReciente {
    constructor() {
        this.usuario_act = '';
        this.actividad = '';
        this.entidad_act = '';
        this.registro_act = new Date();
    }
};
exports.ActividadReciente = ActividadReciente;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], ActividadReciente.prototype, "usuario_act", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], ActividadReciente.prototype, "actividad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], ActividadReciente.prototype, "entidad_act", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ActividadReciente.prototype, "registro_act", void 0);
exports.ActividadReciente = ActividadReciente = __decorate([
    (0, typeorm_1.Entity)('actividad_reciente'),
    __metadata("design:paramtypes", [])
], ActividadReciente);
