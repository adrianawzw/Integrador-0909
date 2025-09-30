// backend/src/routes/admin.routes.js
import express from 'express';
import { loginMiddleware } from '../../middlewares/login.middleware.js';
import { checkAdmin } from '../../middlewares/checkAdmin.middleware.js';

// Controladores separados
import * as adminController from '../../controllers/admin/admin.controller.js';
import * as adminDocenteController from '../../controllers/admin/admin-docente.controller.js';
import * as adminEstudianteController from '../../controllers/admin/admin-estudiante.controller.js';
import * as adminUsuarioController from '../../controllers/admin/admin-usuario.controller.js';
import * as adminDashboardController from '../../controllers/admin/admin-dashboard.controller.js';

const router = express.Router();

// Aplicar middlewares globales (todas las rutas requieren ser admin)
router.use(loginMiddleware);
router.use(checkAdmin);

// ===============================
// RUTAS ADMIN GENERALES
// ===============================
router.get('/', adminController.getAdminPanel);
router.get('/perfil', adminController.getAdminProfile);

// ===============================
// RUTAS DE DOCENTES
// ===============================
router.post('/docentes', adminDocenteController.createDocente);
router.get('/docentes', adminDocenteController.getDocentes);
router.put('/docentes/:id', adminDocenteController.updateDocente);
router.delete('/docentes/:id', adminDocenteController.deleteDocente);

// ===============================
// RUTAS DE ESTUDIANTES
// ===============================
router.post('/estudiantes', adminEstudianteController.createEstudiante);
router.get('/estudiantes', adminEstudianteController.getEstudiantes);
router.put('/estudiantes/:id', adminEstudianteController.updateEstudiante);
router.delete('/estudiantes/:id', adminEstudianteController.deleteEstudiante);

// ===============================
// RUTAS DE USUARIOS
// ===============================
router.get('/usuarios', adminUsuarioController.getAllUsers);

// ===============================
// RUTAS DEL DASHBOARD
// ===============================
router.get('/stats', adminDashboardController.getDashboardStats);

// ===============================
// RUTAS EXTRA (ejemplo secciones / notificaciones si quieres mantenerlas aquí)
// ===============================
// Secciones
// router.get('/secciones', adminSeccionController.getSecciones);
// router.post('/secciones', adminSeccionController.createSeccion);

// Notificaciones
// router.post('/notificaciones', adminNotificacionController.createNotificacion);
// router.get('/notificaciones', adminNotificacionController.getNotificaciones);

export default router;
