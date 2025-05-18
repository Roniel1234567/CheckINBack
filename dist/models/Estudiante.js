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
exports.Estudiante = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Contacto_1 = require("./Contacto");
const Taller_1 = require("./Taller");
const Direccion_1 = require("./Direccion");
const CicloEscolar_1 = require("./CicloEscolar");
const familia_profecional_1 = require("./familia_profecional"); // Ajusta la ruta según corresponda
const Poliza_1 = require("./Poliza");
let Estudiante = class Estudiante {
    constructor() {
        this.tipo_documento_est = 'Cédula';
        this.documento_id_est = '';
        this.usuario_est = new User_1.Usuario();
        this.nombre_est = '';
        this.seg_nombre_est = '';
        this.apellido_est = '';
        this.seg_apellido_est = '';
        this.fecha_nac_est = new Date();
        this.contacto_est = new Contacto_1.Contacto();
        this.direccion_id = new Direccion_1.Direccion();
        this.ciclo_escolar_est = new CicloEscolar_1.CicloEscolar();
        this.creacion_est = new Date();
        this.taller_est = new Taller_1.Taller('', '', new familia_profecional_1.FamiliaProfesional());
        // Inicialización de campos de pasantía y póliza
        this.horaspasrealizadas_est = 0;
        this.fecha_inicio_pasantia = undefined;
        this.fecha_fin_pasantia = undefined;
    }
};
exports.Estudiante = Estudiante;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'Cédula' }),
    __metadata("design:type", String)
], Estudiante.prototype, "tipo_documento_est", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Estudiante.prototype, "documento_id_est", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_est' }),
    __metadata("design:type", User_1.Usuario)
], Estudiante.prototype, "usuario_est", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Estudiante.prototype, "nombre_est", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Estudiante.prototype, "seg_nombre_est", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Estudiante.prototype, "apellido_est", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Estudiante.prototype, "seg_apellido_est", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Estudiante.prototype, "fecha_nac_est", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Contacto_1.Contacto),
    (0, typeorm_1.JoinColumn)({ name: 'contacto_est' }),
    __metadata("design:type", Contacto_1.Contacto)
], Estudiante.prototype, "contacto_est", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Taller_1.Taller),
    (0, typeorm_1.JoinColumn)({ name: 'taller_est' }),
    __metadata("design:type", Taller_1.Taller)
], Estudiante.prototype, "taller_est", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Direccion_1.Direccion),
    (0, typeorm_1.JoinColumn)({ name: 'direccion_id' }),
    __metadata("design:type", Direccion_1.Direccion)
], Estudiante.prototype, "direccion_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CicloEscolar_1.CicloEscolar),
    (0, typeorm_1.JoinColumn)({ name: 'ciclo_escolar_est' }),
    __metadata("design:type", CicloEscolar_1.CicloEscolar)
], Estudiante.prototype, "ciclo_escolar_est", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Estudiante.prototype, "horaspasrealizadas_est", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Estudiante.prototype, "creacion_est", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Estudiante.prototype, "fecha_inicio_pasantia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Estudiante.prototype, "fecha_fin_pasantia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Poliza_1.Poliza, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_poliza' }),
    __metadata("design:type", Poliza_1.Poliza)
], Estudiante.prototype, "poliza", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Estudiante.prototype, "nacionalidad", void 0);
exports.Estudiante = Estudiante = __decorate([
    (0, typeorm_1.Entity)('estudiante'),
    __metadata("design:paramtypes", [])
], Estudiante);
