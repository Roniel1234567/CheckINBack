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
exports.Usuario = void 0;
const typeorm_1 = require("typeorm");
const Rol_1 = require("./Rol");
let Usuario = class Usuario {
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_usu' }),
    __metadata("design:type", Number)
], Usuario.prototype, "id_usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 25, unique: true, name: 'usuario' }),
    __metadata("design:type", String)
], Usuario.prototype, "dato_usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'contrasena_usu' }),
    __metadata("design:type", String)
], Usuario.prototype, "contrasena_usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', name: 'rol_usu' }),
    __metadata("design:type", Number)
], Usuario.prototype, "rol_usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Activo', 'Inactivo', 'Eliminado'],
        default: 'Activo',
        name: 'estado_usu'
    }),
    __metadata("design:type", String)
], Usuario.prototype, "estado_usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        name: 'creacion_usu',
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Usuario.prototype, "creacion_usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Rol_1.Rol),
    (0, typeorm_1.JoinColumn)({ name: 'rol_usu' }),
    __metadata("design:type", Rol_1.Rol)
], Usuario.prototype, "rol", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)('usuario')
], Usuario);
