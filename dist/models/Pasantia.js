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
exports.Pasantia = void 0;
const typeorm_1 = require("typeorm");
const Estudiante_1 = require("./Estudiante");
const CentroDeTrabajo_1 = require("./CentroDeTrabajo");
const Supervisor_1 = require("./Supervisor");
let Pasantia = class Pasantia {
    constructor() {
        this.id_pas = 0;
        this.estudiante_pas = new Estudiante_1.Estudiante();
        this.centro_pas = new CentroDeTrabajo_1.CentroDeTrabajo();
        this.supervisor_pas = new Supervisor_1.Supervisor();
        this.horas_pas = 0;
        this.inicio_pas = new Date();
        this.fin_pas = new Date();
        this.estado_pas = 'Pendiente';
        this.creacion_pas = new Date();
    }
};
exports.Pasantia = Pasantia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pasantia.prototype, "id_pas", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Estudiante_1.Estudiante),
    (0, typeorm_1.JoinColumn)({ name: 'estudiante_pas' }),
    __metadata("design:type", Estudiante_1.Estudiante)
], Pasantia.prototype, "estudiante_pas", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CentroDeTrabajo_1.CentroDeTrabajo),
    (0, typeorm_1.JoinColumn)({ name: 'centro_pas' }),
    __metadata("design:type", CentroDeTrabajo_1.CentroDeTrabajo)
], Pasantia.prototype, "centro_pas", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Supervisor_1.Supervisor),
    (0, typeorm_1.JoinColumn)({ name: 'supervisor_pas' }),
    __metadata("design:type", Supervisor_1.Supervisor)
], Pasantia.prototype, "supervisor_pas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: () => 'horaspasxtaller()' }),
    __metadata("design:type", Number)
], Pasantia.prototype, "horas_pas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Pasantia.prototype, "inicio_pas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Pasantia.prototype, "fin_pas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'Pendiente' }),
    __metadata("design:type", String)
], Pasantia.prototype, "estado_pas", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Pasantia.prototype, "creacion_pas", void 0);
exports.Pasantia = Pasantia = __decorate([
    (0, typeorm_1.Entity)('pasantia'),
    __metadata("design:paramtypes", [])
], Pasantia);
