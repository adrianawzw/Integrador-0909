// src/routes/admin/admin-dashboard.routes.js
import express from 'express';
import { loginMiddleware } from '../../middlewares/login.middleware.js';
import { checkAdmin } from '../../middlewares/checkAdmin.middleware.js';
import * as adminDashboardController from '../../controllers/admin/admin-dashboard.controller.js';

const router = express.Router();

// Aplicar middlewares
router.use(loginMiddleware, checkAdmin);

// Ruta para obtener estadísticas del dashboard
router.get('/stats', adminDashboardController.getDashboardStats);

export default router;
