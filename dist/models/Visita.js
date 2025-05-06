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
exports.Visita = void 0;
const typeorm_1 = require("typeorm");
const Tutor_1 = require("./Tutor"); // Asegúrate de que esta entidad exista
const CentroDeTrabajo_1 = require("./CentroDeTrabajo"); // Asegúrate de que esta entidad exista
let Visita = class Visita {
    constructor(tutor_vis, centro_vis, motivo_vis, fecha_vis, hora_vis, observacion_vis) {
        this.tutor_vis = tutor_vis;
        this.centro_vis = centro_vis;
        this.motivo_vis = motivo_vis;
        this.fecha_vis = fecha_vis;
        this.hora_vis = hora_vis;
        this.observacion_vis = observacion_vis;
        this.creacion_vis = new Date();
    }
};
exports.Visita = Visita;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Visita.prototype, "id_vis", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tutor_1.Tutor, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'tutor_vis' }),
    __metadata("design:type", Tutor_1.Tutor)
], Visita.prototype, "tutor_vis", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CentroDeTrabajo_1.CentroDeTrabajo, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'centro_vis' }),
    __metadata("design:type", CentroDeTrabajo_1.CentroDeTrabajo)
], Visita.prototype, "centro_vis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Visita.prototype, "motivo_vis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: false }),
    __metadata("design:type", Date)
], Visita.prototype, "fecha_vis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], Visita.prototype, "hora_vis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Visita.prototype, "observacion_vis", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'creacion_vis' }),
    __metadata("design:type", Date)
], Visita.prototype, "creacion_vis", void 0);
exports.Visita = Visita = __decorate([
    (0, typeorm_1.Entity)('visita'),
    __metadata("design:paramtypes", [Tutor_1.Tutor,
        CentroDeTrabajo_1.CentroDeTrabajo, String, Date, String, String])
], Visita);
exports.default = Visita;
