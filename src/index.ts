import "reflect-metadata";
import { AppDataSource } from "./data-source";
import app from "./server";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log("✅ Conectado a la base de datos");
        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error al inicializar:", error);
        process.exit(1);
    }
};

AppDataSource.initialize()
  .then(async () => {
    console.log('Verificando conexión a la base de datos...');
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    
    // Test queries
    const provincias = await queryRunner.query('SELECT * FROM provincia');
    console.log('Provincias disponibles:', provincias);
    
    const ciudades = await queryRunner.query('SELECT * FROM ciudad LIMIT 5');
    console.log('Muestra de ciudades:', ciudades);
    
    await queryRunner.release();
    
    console.log('✅ Conexión a la base de datos verificada');
    // ...resto del código
  })
  .catch(error => console.error('Error durante la inicialización:', error));

startServer();