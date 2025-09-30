// backend/src/routes/admin/admin-usuarios.routes.js
import { Router } from 'express';
import { getAllUsers } from '../../controllers/admin/admin-usuario.controller.js';
import { authMiddleware } from '../../middlewares/login.middleware.js';
import { checkAdmin } from '../../middlewares/checkAdmin.middleware.js';

const router = Router();

// GET /api/users (solo admin puede ver usuarios)
router.get('/', authMiddleware, checkAdmin, getAllUsers);

export default router;
