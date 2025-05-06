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
exports.Tutor = void 0;
const typeorm_1 = require("typeorm");
let Tutor = class Tutor {
    constructor(usuario_tutor = 0, nombre_tutor = '', apellido_tutor = '', contacto_tutor = 0) {
        this.usuario_tutor = usuario_tutor;
        this.nombre_tutor = nombre_tutor;
        this.apellido_tutor = apellido_tutor;
        this.contacto_tutor = contacto_tutor;
        this.creacion_tutor = new Date();
    }
};
exports.Tutor = Tutor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tutor.prototype, "id_tutor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_tutor' }),
    __metadata("design:type", Number)
], Tutor.prototype, "usuario_tutor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Tutor.prototype, "nombre_tutor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Tutor.prototype, "apellido_tutor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.JoinColumn)({ name: 'contacto_tutor' }),
    __metadata("design:type", Number)
], Tutor.prototype, "contacto_tutor", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'creacion_tutor' }),
    __metadata("design:type", Date)
], Tutor.prototype, "creacion_tutor", void 0);
exports.Tutor = Tutor = __decorate([
    (0, typeorm_1.Entity)('tutor'),
    __metadata("design:paramtypes", [Number, String, String, Number])
], Tutor);
