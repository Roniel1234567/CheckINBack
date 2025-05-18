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
};
exports.DocEstudiante = DocEstudiante;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'est_doc', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], DocEstudiante.prototype, "est_doc", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Estudiante_1.Estudiante, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'est_doc', referencedColumnName: 'documento_id_est' }),
    __metadata("design:type", Estudiante_1.Estudiante)
], DocEstudiante.prototype, "estudiante", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bytea', name: 'ced_est', nullable: true }),
    __metadata("design:type", Buffer)
], DocEstudiante.prototype, "ced_est", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bytea', name: 'cv_doc', nullable: true }),
    __metadata("design:type", Buffer)
], DocEstudiante.prototype, "cv_doc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bytea', name: 'anexo_iv_doc', nullable: true }),
    __metadata("design:type", Buffer)
], DocEstudiante.prototype, "anexo_iv_doc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bytea', name: 'anexo_v_doc', nullable: true }),
    __metadata("design:type", Buffer)
], DocEstudiante.prototype, "anexo_v_doc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bytea', name: 'acta_nac_doc', nullable: true }),
    __metadata("design:type", Buffer)
], DocEstudiante.prototype, "acta_nac_doc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bytea', name: 'ced_padres_doc', nullable: true }),
    __metadata("design:type", Buffer)
], DocEstudiante.prototype, "ced_padres_doc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bytea', name: 'vac_covid_doc', nullable: true }),
    __metadata("design:type", Buffer)
], DocEstudiante.prototype, "vac_covid_doc", void 0);
exports.DocEstudiante = DocEstudiante = __decorate([
    (0, typeorm_1.Entity)('doc_estudiante')
], DocEstudiante);
