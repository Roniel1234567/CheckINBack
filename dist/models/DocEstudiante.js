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
exports.DocEstudiante = void 0;
const typeorm_1 = require("typeorm");
const Estudiante_1 = require("./Estudiante");
let DocEstudiante = class DocEstudiante {
    constructor() {
        this.est_doc = '';
        this.id_doc = 'Pendiente';
        this.cv_doc = 'Pendiente';
        this.anexo_iv_doc = 'Pendiente';
        this.anexo_v_doc = 'Pendiente';
        this.acta_nac_doc = 'Pendiente';
        this.ced_padres_doc = 'Pendiente';
        this.vac_covid_doc = 'Pendiente';
        this.estudiante = new Estudiante_1.Estudiante();
    }
};
exports.DocEstudiante = DocEstudiante;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], DocEstudiante.prototype, "est_doc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'Pendiente' }),
    __metadata("design:type", String)
], DocEstudiante.prototype, "id_doc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'Pendiente' }),
    __metadata("design:type", String)
], DocEstudiante.prototype, "cv_doc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'Pendiente' }),
    __metadata("design:type", String)
], DocEstudiante.prototype, "anexo_iv_doc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'Pendiente' }),
    __metadata("design:type", String)
], DocEstudiante.prototype, "anexo_v_doc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'Pendiente' }),
    __metadata("design:type", String)
], DocEstudiante.prototype, "acta_nac_doc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'Pendiente' }),
    __metadata("design:type", String)
], DocEstudiante.prototype, "ced_padres_doc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'Pendiente' }),
    __metadata("design:type", String)
], DocEstudiante.prototype, "vac_covid_doc", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Estudiante_1.Estudiante),
    (0, typeorm_1.JoinColumn)({ name: 'est_doc' }),
    __metadata("design:type", Estudiante_1.Estudiante)
], DocEstudiante.prototype, "estudiante", void 0);
exports.DocEstudiante = DocEstudiante = __decorate([
    (0, typeorm_1.Entity)('doc_estudiante'),
    __metadata("design:paramtypes", [])
], DocEstudiante);
