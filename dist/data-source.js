"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Ciudad_1 = require("./models/Ciudad");
const Provincia_1 = require("./models/Provincia");
const Sector_1 = require("./models/Sector");
const Taller_1 = require("./models/Taller");
const CentroDeTrabajo_1 = require("./models/CentroDeTrabajo");
const Contacto_1 = require("./models/Contacto");
const Direccion_1 = require("./models/Direccion");
const familia_profecional_1 = require("./models/familia_profecional");
const Estudiante_1 = require("./models/Estudiante");
const User_1 = require("./models/User");
const CicloEscolar_1 = require("./models/CicloEscolar");
const Rol_1 = require("./models/Rol");
const DocEstudiante_1 = require("./models/DocEstudiante");
const PersonaContactoEmpresa_1 = require("./models/PersonaContactoEmpresa");
const PersonaContactoEstudiante_1 = require("./models/PersonaContactoEstudiante");
const Poliza_1 = require("./models/Poliza");
const Plazas_1 = require("./models/Plazas");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || "5432"),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: false,
    logging: true,
    entities: [
        Ciudad_1.Ciudad,
        Provincia_1.Provincia,
        Sector_1.Sector,
        Taller_1.Taller,
        CentroDeTrabajo_1.CentroDeTrabajo,
        Contacto_1.Contacto,
        Direccion_1.Direccion,
        familia_profecional_1.FamiliaProfesional,
        Estudiante_1.Estudiante,
        User_1.Usuario,
        CicloEscolar_1.CicloEscolar,
        Rol_1.Rol,
        DocEstudiante_1.DocEstudiante,
        PersonaContactoEmpresa_1.PersonaContactoEmpresa,
        PersonaContactoEstudiante_1.PersonaContactoEstudiante,
        Poliza_1.Poliza,
        Plazas_1.PlazasCentro
    ],
    migrations: [],
    subscribers: []
});
