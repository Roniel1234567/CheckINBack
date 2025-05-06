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
exports.Taller = void 0;
const typeorm_1 = require("typeorm");
const familia_profecional_1 = require("./familia_profecional"); // ✅ Asegúrate de que el nombre del archivo es correcto.
let Taller = class Taller {
    constructor(id_taller = '', nombre_taller = '', familia_taller, // ← ¡Este es obligatorio!
    cod_titulo_taller = '', estado_taller = 'Activo') {
        this.id_taller = id_taller;
        this.nombre_taller = nombre_taller;
        this.familia_taller = familia_taller;
        this.cod_titulo_taller = cod_titulo_taller;
        this.estado_taller = estado_taller;
    }
};
exports.Taller = Taller;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 5 }),
    __metadata("design:type", String)
], Taller.prototype, "id_taller", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Taller.prototype, "nombre_taller", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => familia_profecional_1.FamiliaProfesional, { nullable: false }) // 🔥 Relación correcta
    ,
    (0, typeorm_1.JoinColumn)({ name: 'familia_taller', referencedColumnName: 'id_fam' }) // 🔥 Hace referencia a 'id_fam'
    ,
    __metadata("design:type", familia_profecional_1.FamiliaProfesional)
], Taller.prototype, "familia_taller", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 8, unique: true }),
    __metadata("design:type", String)
], Taller.prototype, "cod_titulo_taller", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    }),
    __metadata("design:type", String)
], Taller.prototype, "estado_taller", void 0);
exports.Taller = Taller = __decorate([
    (0, typeorm_1.Entity)('taller'),
    __metadata("design:paramtypes", [String, String, familia_profecional_1.FamiliaProfesional, String, String])
], Taller);
