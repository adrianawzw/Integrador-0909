// src/routes/admin/admin-estudiantes.routes.js
import express from 'express';
import { authMiddleware } from '../../middlewares/login.middleware.js';
import { checkAdmin } from '../../middlewares/checkAdmin.middleware.js';
import * as adminEstudianteController from '../../controllers/admin/admin-estudiante.controller.js';

const router = express.Router();
router.use(authMiddleware, checkAdmin);

router.post('/', adminEstudianteController.createEstudiante);
router.get('/', adminEstudianteController.getEstudiantes);
router.put('/:id', adminEstudianteController.updateEstudiante);
router.delete('/:id', adminEstudianteController.deleteEstudiante);

export default router;
