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
exports.Supervisor = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Contacto_1 = require("./Contacto");
let Supervisor = class Supervisor {
    constructor() {
        this.creacion_usu = new Date();
    }
};
exports.Supervisor = Supervisor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Supervisor.prototype, "id_sup", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.Usuario, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_sup' }),
    __metadata("design:type", User_1.Usuario)
], Supervisor.prototype, "usuario_sup", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Supervisor.prototype, "nombre_sup", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Supervisor.prototype, "apellido_sup", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Contacto_1.Contacto, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'contacto_sup' }),
    __metadata("design:type", Contacto_1.Contacto)
], Supervisor.prototype, "contacto_sup", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'creacion_usu' }),
    __metadata("design:type", Date)
], Supervisor.prototype, "creacion_usu", void 0);
exports.Supervisor = Supervisor = __decorate([
    (0, typeorm_1.Entity)('supervisor'),
    __metadata("design:paramtypes", [])
], Supervisor);
