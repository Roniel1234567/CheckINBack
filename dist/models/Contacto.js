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
exports.Contacto = void 0;
const typeorm_1 = require("typeorm");
let Contacto = class Contacto {
    constructor() {
        this.id_contacto = 0;
        this.telefono_contacto = '';
        this.email_contacto = '';
        this.estado_contacto = 'Activo';
        this.creacion_contacto = new Date();
    }
};
exports.Contacto = Contacto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Contacto.prototype, "id_contacto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char', length: 12 }),
    __metadata("design:type", String)
], Contacto.prototype, "telefono_contacto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Contacto.prototype, "email_contacto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'Activo' }),
    __metadata("design:type", String)
], Contacto.prototype, "estado_contacto", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Contacto.prototype, "creacion_contacto", void 0);
exports.Contacto = Contacto = __decorate([
    (0, typeorm_1.Entity)('contacto'),
    __metadata("design:paramtypes", [])
], Contacto);
