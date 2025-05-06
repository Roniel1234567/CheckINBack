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
exports.VisitaEstudiante = void 0;
const typeorm_1 = require("typeorm");
const Visita_1 = require("./Visita"); // Asegúrate de que esta entidad exista
const Estudiante_1 = require("./Estudiante"); // Asegúrate de que esta entidad exista
let VisitaEstudiante = class VisitaEstudiante {
    constructor(visita, estudiante_vis, observacion_est) {
        this.visita = visita;
        this.estudiante_vis = estudiante_vis;
        this.observacion_est = observacion_est;
    }
};
exports.VisitaEstudiante = VisitaEstudiante;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VisitaEstudiante.prototype, "visita_est", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Visita_1.Visita, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'visita_est' }),
    __metadata("design:type", Visita_1.Visita)
], VisitaEstudiante.prototype, "visita", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Estudiante_1.Estudiante, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'estudiante_vis' }),
    __metadata("design:type", Estudiante_1.Estudiante)
], VisitaEstudiante.prototype, "estudiante_vis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], VisitaEstudiante.prototype, "observacion_est", void 0);
exports.VisitaEstudiante = VisitaEstudiante = __decorate([
    (0, typeorm_1.Entity)('visita_estudiante'),
    __metadata("design:paramtypes", [Visita_1.Visita, Estudiante_1.Estudiante, String])
], VisitaEstudiante);
exports.default = VisitaEstudiante;
