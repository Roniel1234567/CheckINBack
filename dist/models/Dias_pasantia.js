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
exports.DiasPasantia = void 0;
const typeorm_1 = require("typeorm");
const Pasantia_1 = require("./Pasantia"); // Asegúrate de que esta entidad exista
let DiasPasantia = class DiasPasantia {
    constructor(pasantia_diapas, dia_semana) {
        this.pasantia_diapas = pasantia_diapas;
        this.dia_semana = dia_semana;
        this.creacion_diapas = new Date();
    }
};
exports.DiasPasantia = DiasPasantia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DiasPasantia.prototype, "id_diapas", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Pasantia_1.Pasantia, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'Dias_pasantia' }),
    __metadata("design:type", Pasantia_1.Pasantia)
], DiasPasantia.prototype, "pasantia_diapas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], DiasPasantia.prototype, "dia_semana", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'Dias_pasantia' }),
    __metadata("design:type", Date)
], DiasPasantia.prototype, "creacion_diapas", void 0);
exports.DiasPasantia = DiasPasantia = __decorate([
    (0, typeorm_1.Entity)('Dias_pasantia'),
    __metadata("design:paramtypes", [Pasantia_1.Pasantia, Number])
], DiasPasantia);
exports.default = DiasPasantia;
