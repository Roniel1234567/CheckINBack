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
exports.PersonaContactoEmpresa = void 0;
const typeorm_1 = require("typeorm");
const CentroDeTrabajo_1 = require("./CentroDeTrabajo");
let PersonaContactoEmpresa = class PersonaContactoEmpresa {
};
exports.PersonaContactoEmpresa = PersonaContactoEmpresa;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_persona_contacto' }),
    __metadata("design:type", Number)
], PersonaContactoEmpresa.prototype, "id_persona_contacto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'nombre_persona_contacto' }),
    __metadata("design:type", String)
], PersonaContactoEmpresa.prototype, "nombre_persona_contacto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'apellido_persona_contacto' }),
    __metadata("design:type", String)
], PersonaContactoEmpresa.prototype, "apellido_persona_contacto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'telefono' }),
    __metadata("design:type", String)
], PersonaContactoEmpresa.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, name: 'extension', nullable: true }),
    __metadata("design:type", String)
], PersonaContactoEmpresa.prototype, "extension", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'departamento', nullable: true }),
    __metadata("design:type", String)
], PersonaContactoEmpresa.prototype, "departamento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CentroDeTrabajo_1.CentroDeTrabajo, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'centro_trabajo_id', referencedColumnName: 'id_centro' }),
    __metadata("design:type", CentroDeTrabajo_1.CentroDeTrabajo)
], PersonaContactoEmpresa.prototype, "centro_trabajo", void 0);
exports.PersonaContactoEmpresa = PersonaContactoEmpresa = __decorate([
    (0, typeorm_1.Entity)('persona_contacto_empresa')
], PersonaContactoEmpresa);
