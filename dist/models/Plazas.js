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
exports.PlazasCentro = void 0;
const typeorm_1 = require("typeorm");
const CentroDeTrabajo_1 = require("./CentroDeTrabajo");
const Taller_1 = require("./Taller");
let PlazasCentro = class PlazasCentro {
    constructor() {
        this.plazas_centro = 0;
        this.plazas_ocupadas = 0;
        this.creacion_plaza = new Date();
    }
};
exports.PlazasCentro = PlazasCentro;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PlazasCentro.prototype, "id_plaza", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CentroDeTrabajo_1.CentroDeTrabajo, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'centro_plaza' }),
    __metadata("design:type", CentroDeTrabajo_1.CentroDeTrabajo)
], PlazasCentro.prototype, "centro_plaza", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Taller_1.Taller, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'taller_plaza' }),
    __metadata("design:type", Taller_1.Taller)
], PlazasCentro.prototype, "taller_plaza", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: false }),
    __metadata("design:type", Number)
], PlazasCentro.prototype, "plazas_centro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0, nullable: false }),
    __metadata("design:type", Number)
], PlazasCentro.prototype, "plazas_ocupadas", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'creacion_plaza' }),
    __metadata("design:type", Date)
], PlazasCentro.prototype, "creacion_plaza", void 0);
exports.PlazasCentro = PlazasCentro = __decorate([
    (0, typeorm_1.Entity)('plazas_centro'),
    __metadata("design:paramtypes", [])
], PlazasCentro);
exports.default = PlazasCentro;
