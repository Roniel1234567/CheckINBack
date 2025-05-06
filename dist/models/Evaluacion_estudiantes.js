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
exports.EvaluacionEstudiante = void 0;
const typeorm_1 = require("typeorm");
const Pasantia_1 = require("./Pasantia"); // Asegúrate de que esta entidad exista
let EvaluacionEstudiante = class EvaluacionEstudiante {
    constructor() {
        this.fecha_eval = new Date();
    }
};
exports.EvaluacionEstudiante = EvaluacionEstudiante;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EvaluacionEstudiante.prototype, "id_eval_est", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Pasantia_1.Pasantia, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'pasantia_eval' }),
    __metadata("design:type", Pasantia_1.Pasantia)
], EvaluacionEstudiante.prototype, "pasantia_eval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], EvaluacionEstudiante.prototype, "ra_eval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], EvaluacionEstudiante.prototype, "asistencia_eval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], EvaluacionEstudiante.prototype, "desempe\u00F1o_eval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], EvaluacionEstudiante.prototype, "disponibilidad_eval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], EvaluacionEstudiante.prototype, "responsabilidad_eval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], EvaluacionEstudiante.prototype, "limpieza_eval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], EvaluacionEstudiante.prototype, "trabajo_equipo_eval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], EvaluacionEstudiante.prototype, "resolucion_problemas_eval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], EvaluacionEstudiante.prototype, "observaciones_eval", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_eval' }),
    __metadata("design:type", Date)
], EvaluacionEstudiante.prototype, "fecha_eval", void 0);
exports.EvaluacionEstudiante = EvaluacionEstudiante = __decorate([
    (0, typeorm_1.Entity)('evaluacion_estudiante'),
    (0, typeorm_1.Unique)(['pasantia_eval', 'ra_eval']),
    __metadata("design:paramtypes", [])
], EvaluacionEstudiante);
exports.default = EvaluacionEstudiante;
