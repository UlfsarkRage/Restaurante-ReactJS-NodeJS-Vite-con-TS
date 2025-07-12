// Importamos Express y los tipos necesarios para que TypeScript entienda
import express, { Request, Response, json } from 'express';
import cors from 'cors';

// Importamos el archivo de rutas
// Le decimos que busque el archivo compilado en el futuro ('/pedidos.js')
import pedidosRoutes from './routes/pedidos.js';

// Creamos la aplicación del servidor
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(json()); 
app.use(cors());

// Le decimos a la aplicación qué rutas usar
app.use('/api/pedidos', pedidosRoutes);

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor de backend escuchando en el puerto ${PORT}`);
});