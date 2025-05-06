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
exports.EvaluacionCentroTrabajo = void 0;
const typeorm_1 = require("typeorm");
const Pasantia_1 = require("./Pasantia");
let EvaluacionCentroTrabajo = class EvaluacionCentroTrabajo {
    constructor() {
        this.id_eval_centro = 0;
        this.pasantia_eval_centro = new Pasantia_1.Pasantia();
        this.espacio_trabajo_eval = 0;
        this.asignacion_tareas_eval = 0;
        this.disponibilidad_dudas_eval = 0;
        this.observaciones_eval_centro = '';
        this.fecha_eval_centro = new Date();
    }
};
exports.EvaluacionCentroTrabajo = EvaluacionCentroTrabajo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EvaluacionCentroTrabajo.prototype, "id_eval_centro", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Pasantia_1.Pasantia),
    (0, typeorm_1.JoinColumn)({ name: 'pasantia_eval_centro' }),
    __metadata("design:type", Pasantia_1.Pasantia)
], EvaluacionCentroTrabajo.prototype, "pasantia_eval_centro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], EvaluacionCentroTrabajo.prototype, "espacio_trabajo_eval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], EvaluacionCentroTrabajo.prototype, "asignacion_tareas_eval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], EvaluacionCentroTrabajo.prototype, "disponibilidad_dudas_eval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], EvaluacionCentroTrabajo.prototype, "observaciones_eval_centro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: () => 'CURRENT_DATE' }),
    __metadata("design:type", Date)
], EvaluacionCentroTrabajo.prototype, "fecha_eval_centro", void 0);
exports.EvaluacionCentroTrabajo = EvaluacionCentroTrabajo = __decorate([
    (0, typeorm_1.Entity)('evaluacion_centro_trabajo'),
    __metadata("design:paramtypes", [])
], EvaluacionCentroTrabajo);
