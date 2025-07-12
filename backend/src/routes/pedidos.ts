// Importamos Express y los tipos
import { Router, Request, Response } from 'express';
const router = Router();
import { procesarPedido } from '../controllers/pedidosController.js';

// Creamos la ruta
// Le damos a TypeScript los tipos que tendrá el `request` y `response`
router.post('/procesar', (req: Request, res: Response) => {
  // Ahora llamamos al controlador con la petición y respuesta tipadas
  procesarPedido(req, res);
});

export default router;