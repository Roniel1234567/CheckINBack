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
require("reflect-metadata");
const data_source_1 = require("./data-source");
const server_1 = __importDefault(require("./server"));
const PORT = process.env.PORT || 5000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield data_source_1.AppDataSource.initialize();
        console.log("✅ Conectado a la base de datos");
        server_1.default.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Error al inicializar:", error);
        process.exit(1);
    }
});
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Verificando conexión a la base de datos...');
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    // Test queries
    const provincias = yield queryRunner.query('SELECT * FROM provincia');
    console.log('Provincias disponibles:', provincias);
    const ciudades = yield queryRunner.query('SELECT * FROM ciudad LIMIT 5');
    console.log('Muestra de ciudades:', ciudades);
    yield queryRunner.release();
    console.log('✅ Conexión a la base de datos verificada');
    // ...resto del código
}))
    .catch(error => console.error('Error durante la inicialización:', error));
startServer();
