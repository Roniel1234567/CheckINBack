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
exports.CicloEscolar = void 0;
const typeorm_1 = require("typeorm");
let CicloEscolar = class CicloEscolar {
    constructor() {
        this.id_ciclo = 0;
        this.inicio_ciclo = 0;
        this.fin_ciclo = 0;
        this.estado_ciclo = '';
        this.creacion_ciclo = new Date();
    }
};
exports.CicloEscolar = CicloEscolar;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CicloEscolar.prototype, "id_ciclo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], CicloEscolar.prototype, "inicio_ciclo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], CicloEscolar.prototype, "fin_ciclo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], CicloEscolar.prototype, "estado_ciclo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], CicloEscolar.prototype, "creacion_ciclo", void 0);
exports.CicloEscolar = CicloEscolar = __decorate([
    (0, typeorm_1.Entity)('ciclo_escolar'),
    __metadata("design:paramtypes", [])
], CicloEscolar);
