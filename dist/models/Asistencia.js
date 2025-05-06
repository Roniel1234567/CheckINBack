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
exports.AsistenciaPasantia = void 0;
const typeorm_1 = require("typeorm");
let AsistenciaPasantia = class AsistenciaPasantia {
    constructor(pasantia_asis = 0, fecha_asis = new Date(), entrada_asis = new Date(), salida_asis = new Date(), horas_realizadas = 0, asistencia = true, excusa_asis = 0) {
        this.pasantia_asis = pasantia_asis;
        this.fecha_asis = fecha_asis;
        this.entrada_asis = entrada_asis;
        this.salida_asis = salida_asis;
        this.horas_realizadas = horas_realizadas;
        this.asistencia = asistencia;
        this.excusa_asis = excusa_asis;
    }
};
exports.AsistenciaPasantia = AsistenciaPasantia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AsistenciaPasantia.prototype, "id_asis", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.JoinColumn)({ name: 'pasantia_asis' }),
    __metadata("design:type", Number)
], AsistenciaPasantia.prototype, "pasantia_asis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], AsistenciaPasantia.prototype, "fecha_asis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", Date)
], AsistenciaPasantia.prototype, "entrada_asis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", Date)
], AsistenciaPasantia.prototype, "salida_asis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], AsistenciaPasantia.prototype, "horas_realizadas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], AsistenciaPasantia.prototype, "asistencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'excusa_asis' }),
    __metadata("design:type", Number)
], AsistenciaPasantia.prototype, "excusa_asis", void 0);
exports.AsistenciaPasantia = AsistenciaPasantia = __decorate([
    (0, typeorm_1.Entity)('asistencia_pasantia'),
    __metadata("design:paramtypes", [Number, Date,
        Date,
        Date, Number, Boolean, Number])
], AsistenciaPasantia);
