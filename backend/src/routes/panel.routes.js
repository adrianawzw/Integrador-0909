//panel.routes.js
import { Router } from 'express';
import { loginMiddleware } from '../middlewares/login.middleware.js';
import { checkRole } from '../middlewares/checkRole.middleware.js';

const router = Router();

// Panel admin
router.get('/admin', loginMiddleware, checkRole(['admin']), (req, res) => {
  res.json({ message: `Bienvenido admin ${req.user.nombre_usuario}` });
});

// Panel docente
router.get('/docente', loginMiddleware, checkRole(['docente']), (req, res) => {
  res.json({ message: `Bienvenido docente ${req.user.nombre_usuario}` });
});

// Panel estudiante
router.get('/estudiante', loginMiddleware, checkRole(['estudiante']), (req, res) => {
  res.json({ message: `Bienvenido estudiante ${req.user.nombre_usuario}` });
});

export default router;
