// backend/src/controllers/admin/estudiante-admin.controller.js

import { prisma } from '../../config/db.js';

// ===============================
// CREAR ESTUDIANTE
// ===============================
export const createEstudiante = async (req, res) => {
  try {
    const { codigo, dni, nombre, apellido, correo, password, id_seccion } = req.body;

    const usuario = await prisma.usuario.create({
      data: { correo, password, rol: 'estudiante' }
    });

    const estudiante = await prisma.estudiante.create({
      data: {
        codigo,
        dni,
        nombre,
        apellido,
        id_usuario: usuario.id_usuario,
        id_seccion: id_seccion ? parseInt(id_seccion) : null
      },
      include: { usuario: true, seccion: true }
    });

    res.status(201).json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// LISTAR ESTUDIANTES
// ===============================
export const getEstudiantes = async (req, res) => {
  try {
    const estudiantes = await prisma.estudiante.findMany({
      include: { usuario: true, seccion: true }
    });
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// ACTUALIZAR ESTUDIANTE
// ===============================
export const updateEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, dni, nombre, apellido, correo, id_seccion } = req.body;

    const estudiante = await prisma.estudiante.update({
      where: { id_estudiante: parseInt(id) },
      data: {
        codigo,
        dni,
        nombre,
        apellido,
        id_seccion: id_seccion ? parseInt(id_seccion) : null
      },
      include: { usuario: true }
    });

    if (correo) {
      await prisma.usuario.update({
        where: { id_usuario: estudiante.id_usuario },
        data: { correo }
      });
    }

    res.json({ message: 'Estudiante actualizado', estudiante });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// ELIMINAR ESTUDIANTE
// ===============================
export const deleteEstudiante = async (req, res) => {
  try {
    const { id } = req.params;

    const estudiante = await prisma.estudiante.findUnique({
      where: { id_estudiante: parseInt(id) },
      select: { id_usuario: true }
    });

    if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });

    await prisma.usuario.delete({ where: { id_usuario: estudiante.id_usuario } });

    res.json({ message: 'Estudiante eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
