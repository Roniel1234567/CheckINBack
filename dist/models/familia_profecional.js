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
exports.FamiliaProfesional = void 0;
const typeorm_1 = require("typeorm");
let FamiliaProfesional = class FamiliaProfesional {
    constructor(id_fam = '', nombre_fam = '', estado_fam = 'Activo') {
        this.id_fam = id_fam;
        this.nombre_fam = nombre_fam;
        this.estado_fam = estado_fam;
    }
};
exports.FamiliaProfesional = FamiliaProfesional;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'char', length: 3 }),
    __metadata("design:type", String)
], FamiliaProfesional.prototype, "id_fam", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], FamiliaProfesional.prototype, "nombre_fam", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Activo', 'Inactivo', 'Eliminado'],
        default: 'Activo',
        nullable: false
    }),
    __metadata("design:type", String)
], FamiliaProfesional.prototype, "estado_fam", void 0);
exports.FamiliaProfesional = FamiliaProfesional = __decorate([
    (0, typeorm_1.Entity)('familia_profesional'),
    __metadata("design:paramtypes", [String, String, String])
], FamiliaProfesional);
exports.default = FamiliaProfesional;
