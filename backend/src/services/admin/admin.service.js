// src/services/admin.service.js
import { prisma } from '../../config/db.js';

// Función para obtener estadísticas
export const fetchDashboardStats = async () => {
  const docentes = await prisma.docente.count();
  const estudiantes = await prisma.estudiante.count();
  const notificaciones = await prisma.notificacion.count();
  const actividades = await prisma.actividad.count();

  return { docentes, estudiantes, notificaciones, actividades };
};
