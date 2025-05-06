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
exports.Excusa = void 0;
const typeorm_1 = require("typeorm");
const Pasantia_1 = require("./Pasantia");
let Excusa = class Excusa {
    constructor() {
        this.id_exc = 0;
        this.pasantia_exc = new Pasantia_1.Pasantia();
        this.fecha_exc = new Date();
        this.tipo_exc = 'Inasistencia';
        this.justificacion_exc = '';
        this.hora_salida = '';
        this.hora_vuelta = '';
        this.tiempo_salida = 0;
        this.creacion_exc = new Date();
    }
};
exports.Excusa = Excusa;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Excusa.prototype, "id_exc", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Pasantia_1.Pasantia),
    (0, typeorm_1.JoinColumn)({ name: 'pasantia_exc' }),
    __metadata("design:type", Pasantia_1.Pasantia)
], Excusa.prototype, "pasantia_exc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Excusa.prototype, "fecha_exc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'Inasistencia' }),
    __metadata("design:type", String)
], Excusa.prototype, "tipo_exc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Excusa.prototype, "justificacion_exc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], Excusa.prototype, "hora_salida", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], Excusa.prototype, "hora_vuelta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Excusa.prototype, "tiempo_salida", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Excusa.prototype, "creacion_exc", void 0);
exports.Excusa = Excusa = __decorate([
    (0, typeorm_1.Entity)('excusa'),
    __metadata("design:paramtypes", [])
], Excusa);
