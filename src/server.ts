import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import { Usuario } from './models/User';
import { UserRole } from './types/roles';

// Auth and User routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

// Main entity routes
import actividadRecienteRoutes from './routes/Actividad_recienteRoutes';
import asistenciaPasantiaRoutes from './routes/Asistencia_pasantiaRoutes';
import centroTrabajoRoutes from './routes/CentroDeTrabajoRoutes';
import cicloEscolarRoutes from './routes/CicloEscolarRoutes';
import contactoRoutes from './routes/ContactoRoutes';
import diasPasantiaRoutes from './routes/Dias_PasantiaRoutes';
import direccionRoutes from './routes/DireccionRoutes';
import estudianteRoutes from './routes/EstudianteRoutes';
import evaluacionCentroRoutes from './routes/EvaluacionCentroRoutes';
import evaluacionEstudianteRoutes from './routes/EvaluacionEstudianteRoutes';
import excusaRoutes from './routes/ExcusaRoutes';
import familiaProfesionalRoutes from './routes/Familia_profecionalRoutes';
import pasantiaRoutes from './routes/PasantiaRoutes';
import plazasCentroRoutes from './routes/PlazasdeCentroRoutes';
import supervisorRoutes from './routes/SupervisorRoutes';
import tallerRoutes from './routes/TallerRoutes';
import tallerCentroRoutes from './routes/tallerCentroroutes';
import tutorRoutes from './routes/TutorRoutes';
import docEstudianteRoutes from './routes/DocEstudianteRoutes';
import personaContactoEmpresaRoutes from './routes/PersonaContactoEmpresaRoutes';
import personaContactoEstudianteRoutes from './routes/PersonaContactoEstudianteRoutes';

// Location routes
import ciudadRoutes from './routes/CiudadRoutes';
import provinciaRoutes from './routes/ProvinciaRoutes';
import sectorRoutes from './routes/SectorRoutes';

// Role routes
import rolRoutes from './routes/RolRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'development' ? true : 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

// Auth and User routes
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);

// Main entity routes
app.use('/api/actividades', actividadRecienteRoutes);
app.use('/api/asistencias', asistenciaPasantiaRoutes);
app.use('/api/centros-trabajo', centroTrabajoRoutes);
app.use('/api/ciclos', cicloEscolarRoutes);
app.use('/api/contactos', contactoRoutes);
app.use('/api/dias-pasantia', diasPasantiaRoutes);
app.use('/api/direcciones', direccionRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/evaluaciones-centro', evaluacionCentroRoutes);
app.use('/api/evaluaciones-estudiante', evaluacionEstudianteRoutes);
app.use('/api/excusas', excusaRoutes);
app.use('/api/familias-profesionales', familiaProfesionalRoutes);
app.use('/api/pasantias', pasantiaRoutes);
app.use('/api/plazas', plazasCentroRoutes);
app.use('/api/supervisores', supervisorRoutes);
app.use('/api/talleres', tallerRoutes);
app.use('/api/taller-centro', tallerCentroRoutes);
app.use('/api/tutores', tutorRoutes);
app.use('/api/docs-estudiante', docEstudianteRoutes);
app.use('/api/persona-contacto-empresa', personaContactoEmpresaRoutes);
app.use('/api/persona-contacto-estudiante', personaContactoEstudianteRoutes);

// Location routes
app.use('/api/ciudades', ciudadRoutes);
app.use('/api/provincias', provinciaRoutes);
app.use('/api/sectores', sectorRoutes);

// Add specific location endpoints for dropdowns
app.get('/api/ciudades/provincia/:provinciaId', async (req, res) => {
  try {
    const provinciaId = parseInt(req.params.provinciaId);
    const ciudades = await AppDataSource
      .getRepository('Ciudad')
      .createQueryBuilder('ciudad')
      .leftJoinAndSelect('ciudad.provincia', 'provincia')
      .where('ciudad.provincia_ciu = :provinciaId', { provinciaId })
      .getMany();
    
    console.log('Ciudades encontradas:', ciudades); // Debug log
    res.json(ciudades);
  } catch (error: any) {
    console.error('Error detallado:', error);
    res.status(500).json({ 
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? (error && error.message ? error.message : String(error)) : undefined
    });
  }
});

app.get('/api/sectores/ciudad/:ciudadId', async (req, res) => {
  try {
    const ciudadId = parseInt(req.params.ciudadId);
    const sectores = await AppDataSource
      .getRepository('Sector')
      .find({
        where: { ciudad_sec: ciudadId }
      });
    res.json(sectores);
  } catch (error) {
    console.error('Error fetching sectores:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Role routes
app.use('/api/roles', rolRoutes);

// Protected supervisor/tutor route
// ...existing code...

// Simple estudiantes route
app.get('/api/estudiantes', async (req, res) => {
  try {
      const estudiantesRepository = AppDataSource.getRepository('Estudiante');
      const estudiantes = await estudiantesRepository.find();
      res.json(estudiantes);
  } catch (error) {
      console.error('Error fetching estudiantes:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Error handling middleware
app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  let errorMessage: string | undefined = undefined;
  if (process.env.NODE_ENV === 'development') {
    if (err && typeof err === 'object' && 'message' in err) {
      errorMessage = (err as any).message;
    } else {
      errorMessage = String(err);
    }
  }
  res.status(500).json({
    message: 'Error interno del servidor',
    error: errorMessage
  });
});

export default app;

