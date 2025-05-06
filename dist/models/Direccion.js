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
exports.Direccion = void 0;
const typeorm_1 = require("typeorm");
const Sector_1 = require("./Sector");
let Direccion = class Direccion {
    constructor() {
        this.id_dir = 0;
        this.sector_dir = new Sector_1.Sector();
        this.calle_dir = '';
        this.num_res_dir = '';
        this.estado_dir = 'Activo';
        this.creacion_dir = new Date();
    }
};
exports.Direccion = Direccion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Direccion.prototype, "id_dir", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sector_1.Sector),
    (0, typeorm_1.JoinColumn)({ name: 'sector_dir' }),
    __metadata("design:type", Sector_1.Sector)
], Direccion.prototype, "sector_dir", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Direccion.prototype, "calle_dir", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Direccion.prototype, "num_res_dir", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'Activo' }),
    __metadata("design:type", String)
], Direccion.prototype, "estado_dir", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Direccion.prototype, "creacion_dir", void 0);
exports.Direccion = Direccion = __decorate([
    (0, typeorm_1.Entity)('direccion'),
    __metadata("design:paramtypes", [])
], Direccion);
