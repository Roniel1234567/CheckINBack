import "reflect-metadata";
import { DataSource } from "typeorm";
import { Ciudad } from "./models/Ciudad";
import { Provincia } from "./models/Provincia";
import { Sector } from "./models/Sector";
import { Taller } from "./models/Taller";
import { CentroDeTrabajo } from "./models/CentroDeTrabajo";
import { Contacto } from "./models/Contacto";
import { Direccion } from "./models/Direccion";
import { FamiliaProfesional } from "./models/familia_profecional";
import { Estudiante } from "./models/Estudiante";
import { Usuario } from "./models/User";
import { CicloEscolar } from "./models/CicloEscolar";
import { Rol } from "./models/Rol";
import { DocEstudiante } from "./models/DocEstudiante";
import { PersonaContactoEmpresa } from "./models/PersonaContactoEmpresa";
import { PersonaContactoEstudiante } from "./models/PersonaContactoEstudiante";
import { Poliza } from "./models/Poliza";
import { PlazasCentro } from "./models/Plazas";
import { Tutor } from "./models/Tutor";
import { Pasantia } from "./models/Pasantia";
import { DiasPasantia } from "./models/Dias_pasantia";
import { EvaluacionCentroTrabajo } from "./models/Evaluacion_centro";
import { EvaluacionEstudiante } from "./models/Evaluacion_estudiantes";
import { Supervisor } from "./models/Supervisor";
import { Excusa } from "./models/Excusa";
import { AsistenciaPasantia } from "./models/Asistencia";
import { CalificacionEstudiante } from "./models/CalificacionEstudiante";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || "5432"),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: false,
    logging: true,
    entities: [
        Ciudad,
        Provincia,
        Sector,
        Taller,
        CentroDeTrabajo,
        Contacto,
        Direccion,
        FamiliaProfesional,
        Estudiante,
        Usuario,
        CicloEscolar,
        Rol,
        DocEstudiante,
        PersonaContactoEmpresa,
        PersonaContactoEstudiante,
        Poliza,
        PlazasCentro,
        Tutor,
        Pasantia,
        DiasPasantia,
        EvaluacionCentroTrabajo,
        EvaluacionEstudiante,
        Supervisor,
        Excusa,
        AsistenciaPasantia,
        CalificacionEstudiante
    ],
    migrations: [],
    subscribers: []
});



