// src/controllers/usuario-admin.controller.js
import { prisma } from '../../config/db.js';

// ===============================
// LISTAR TODOS LOS USUARIOS
// ===============================
export const getAllUsers = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id_usuario: true,
        correo: true,
        rol: true
      }
    });

    res.json(usuarios);
  } catch (error) {
    console.error("❌ Error en getAllUsers:", error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};
