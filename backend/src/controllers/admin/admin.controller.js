// src/controllers/admin/admin.controller.js
import { prisma } from '../../config/db.js';

// Bienvenida o información básica del panel admin
export const getAdminPanel = async (req, res) => {
  try {
    res.json({
      message: `Bienvenido al panel de administración, ${req.user.nombre_usuario}`,
      rol: req.user.rol
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar el panel admin' });
  }
};

// Ver perfil del admin
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await prisma.usuario.findUnique({
      where: { id_usuario: req.user.id_usuario },
      select: {
        id_usuario: true,
        correo: true,
        rol: true
      }
    });

    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener perfil del admin' });
  }
};
