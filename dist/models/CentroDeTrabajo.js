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
exports.CentroDeTrabajo = void 0;
const typeorm_1 = require("typeorm");
const Direccion_1 = require("./Direccion");
const Contacto_1 = require("./Contacto");
let CentroDeTrabajo = class CentroDeTrabajo {
    constructor() {
        this.estado_centro = 'Activo';
        this.creacion_centro = new Date();
    }
};
exports.CentroDeTrabajo = CentroDeTrabajo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CentroDeTrabajo.prototype, "id_centro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], CentroDeTrabajo.prototype, "nombre_centro", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Direccion_1.Direccion, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'direccion_centro' }),
    __metadata("design:type", Direccion_1.Direccion)
], CentroDeTrabajo.prototype, "direccion_centro", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Contacto_1.Contacto, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'contacto_centro' }),
    __metadata("design:type", Contacto_1.Contacto)
], CentroDeTrabajo.prototype, "contacto_centro", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    }),
    __metadata("design:type", String)
], CentroDeTrabajo.prototype, "estado_centro", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'creacion_centro' }),
    __metadata("design:type", Date)
], CentroDeTrabajo.prototype, "creacion_centro", void 0);
exports.CentroDeTrabajo = CentroDeTrabajo = __decorate([
    (0, typeorm_1.Entity)('centro_trabajo'),
    __metadata("design:paramtypes", [])
], CentroDeTrabajo);
