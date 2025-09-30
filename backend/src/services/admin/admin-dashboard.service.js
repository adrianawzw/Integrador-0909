import { prisma } from '../../config/db.js';

export const getStats = async () => {
  try {
    // Contar registros reales en la base de datos
    const totalUsuarios = await prisma.usuario.count();
    const totalDocentes = await prisma.docente.count();
    const totalEstudiantes = await prisma.estudiante.count();
    const totalNotificaciones = await prisma.notificacion.count(); // si tienes notificaciones

    return {
      totalUsuarios,
      totalDocentes,
      totalEstudiantes,
      totalNotificaciones
    };
  } catch (error) {
    console.error('Error obteniendo estadísticas del dashboard:', error);
    // Si algo falla, puedes devolver 0 para que el frontend no rompa
    return {
      totalUsuarios: 0,
      totalDocentes: 0,
      totalEstudiantes: 0,
      totalNotificaciones: 0
    };
  }
};
