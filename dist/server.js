"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./data-source");
// Auth and User routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// Main entity routes
const Actividad_recienteRoutes_1 = __importDefault(require("./routes/Actividad_recienteRoutes"));
const Asistencia_pasantiaRoutes_1 = __importDefault(require("./routes/Asistencia_pasantiaRoutes"));
const CentroDeTrabajoRoutes_1 = __importDefault(require("./routes/CentroDeTrabajoRoutes"));
const CicloEscolarRoutes_1 = __importDefault(require("./routes/CicloEscolarRoutes"));
const ContactoRoutes_1 = __importDefault(require("./routes/ContactoRoutes"));
const Dias_PasantiaRoutes_1 = __importDefault(require("./routes/Dias_PasantiaRoutes"));
const DireccionRoutes_1 = __importDefault(require("./routes/DireccionRoutes"));
const EstudianteRoutes_1 = __importDefault(require("./routes/EstudianteRoutes"));
const EvaluacionCentroRoutes_1 = __importDefault(require("./routes/EvaluacionCentroRoutes"));
const EvaluacionEstudianteRoutes_1 = __importDefault(require("./routes/EvaluacionEstudianteRoutes"));
const ExcusaRoutes_1 = __importDefault(require("./routes/ExcusaRoutes"));
const Familia_profecionalRoutes_1 = __importDefault(require("./routes/Familia_profecionalRoutes"));
const PasantiaRoutes_1 = __importDefault(require("./routes/PasantiaRoutes"));
const PlazasdeCentroRoutes_1 = __importDefault(require("./routes/PlazasdeCentroRoutes"));
const SupervisorRoutes_1 = __importDefault(require("./routes/SupervisorRoutes"));
const TallerRoutes_1 = __importDefault(require("./routes/TallerRoutes"));
const TutorRoutes_1 = __importDefault(require("./routes/TutorRoutes"));
// Location routes
const CiudadRoutes_1 = __importDefault(require("./routes/CiudadRoutes"));
const ProvinciaRoutes_1 = __importDefault(require("./routes/ProvinciaRoutes"));
const SectorRoutes_1 = __importDefault(require("./routes/SectorRoutes"));
// Role routes
const RolRoutes_1 = __importDefault(require("./routes/RolRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Update with your frontend URL
    credentials: true
}));
app.use(express_1.default.json());
// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});
// Auth and User routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/usuarios', userRoutes_1.default);
// Main entity routes
app.use('/api/actividades', Actividad_recienteRoutes_1.default);
app.use('/api/asistencias', Asistencia_pasantiaRoutes_1.default);
app.use('/api/centros-trabajo', CentroDeTrabajoRoutes_1.default);
app.use('/api/ciclos', CicloEscolarRoutes_1.default);
app.use('/api/contactos', ContactoRoutes_1.default);
app.use('/api/dias-pasantia', Dias_PasantiaRoutes_1.default);
app.use('/api/direcciones', DireccionRoutes_1.default);
app.use('/api/estudiantes', EstudianteRoutes_1.default);
app.use('/api/evaluaciones-centro', EvaluacionCentroRoutes_1.default);
app.use('/api/evaluaciones-estudiante', EvaluacionEstudianteRoutes_1.default);
app.use('/api/excusas', ExcusaRoutes_1.default);
app.use('/api/familias-profesionales', Familia_profecionalRoutes_1.default);
app.use('/api/pasantias', PasantiaRoutes_1.default);
app.use('/api/plazas', PlazasdeCentroRoutes_1.default);
app.use('/api/supervisores', SupervisorRoutes_1.default);
app.use('/api/talleres', TallerRoutes_1.default);
app.use('/api/tutores', TutorRoutes_1.default);
// Location routes
app.use('/api/ciudades', CiudadRoutes_1.default);
app.use('/api/provincias', ProvinciaRoutes_1.default);
app.use('/api/sectores', SectorRoutes_1.default);
// Role routes
app.use('/api/roles', RolRoutes_1.default);
// Protected supervisor/tutor route
// ...existing code...
// Simple estudiantes route
app.get('/api/estudiantes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudiantesRepository = data_source_1.AppDataSource.getRepository('Estudiante');
        const estudiantes = yield estudiantesRepository.find();
        res.json(estudiantes);
    }
    catch (error) {
        console.error('Error fetching estudiantes:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}));
exports.default = app;
