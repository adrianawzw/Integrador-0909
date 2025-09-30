// src/routes/admin/admin-docentes.routes.js
import express from 'express';
import { authMiddleware } from '../../middlewares/login.middleware.js';
import { checkAdmin } from '../../middlewares/checkAdmin.middleware.js';
import * as adminDocenteController from '../../controllers/admin/admin-docente.controller.js';

const router = express.Router();
router.use(authMiddleware, checkAdmin);

router.post('/', adminDocenteController.createDocente);
router.get('/', adminDocenteController.getDocentes);
router.put('/:id', adminDocenteController.updateDocente);
router.delete('/:id', adminDocenteController.deleteDocente);

export default router;
