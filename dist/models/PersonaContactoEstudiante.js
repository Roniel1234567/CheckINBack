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
exports.PersonaContactoEstudiante = void 0;
const typeorm_1 = require("typeorm");
const Estudiante_1 = require("./Estudiante");
let PersonaContactoEstudiante = class PersonaContactoEstudiante {
};
exports.PersonaContactoEstudiante = PersonaContactoEstudiante;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_contacto_estudiante' }),
    __metadata("design:type", Number)
], PersonaContactoEstudiante.prototype, "id_contacto_estudiante", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'nombre' }),
    __metadata("design:type", String)
], PersonaContactoEstudiante.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'apellido' }),
    __metadata("design:type", String)
], PersonaContactoEstudiante.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, name: 'relacion' }),
    __metadata("design:type", String)
], PersonaContactoEstudiante.prototype, "relacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'telefono' }),
    __metadata("design:type", String)
], PersonaContactoEstudiante.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, name: 'correo', nullable: true }),
    __metadata("design:type", String)
], PersonaContactoEstudiante.prototype, "correo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Estudiante_1.Estudiante, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'estudiante_id', referencedColumnName: 'documento_id_est' }),
    __metadata("design:type", Estudiante_1.Estudiante)
], PersonaContactoEstudiante.prototype, "estudiante", void 0);
exports.PersonaContactoEstudiante = PersonaContactoEstudiante = __decorate([
    (0, typeorm_1.Entity)('persona_contacto_estudiante')
], PersonaContactoEstudiante);
