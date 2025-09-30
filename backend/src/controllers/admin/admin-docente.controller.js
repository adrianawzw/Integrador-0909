// backend/src/controllers/admin/docente-admin.controller.js

import { prisma } from '../../config/db.js';

// ===============================
// CREAR DOCENTE
// ===============================
export const createDocente = async (req, res) => {
  try {
    const { codigo, dni, nombre, apellido, correo, password } = req.body;

    const usuario = await prisma.usuario.create({
      data: { correo, password, rol: 'docente' }
    });

    const docente = await prisma.docente.create({
      data: {
        codigo,
        dni,
        nombre,
        apellido,
        id_usuario: usuario.id_usuario
      },
      include: { usuario: true }
    });

    res.status(201).json(docente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// LISTAR DOCENTES
// ===============================
export const getDocentes = async (req, res) => {
  try {
    const docentes = await prisma.docente.findMany({ include: { usuario: true } });
    res.json(docentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// ACTUALIZAR DOCENTE
// ===============================
export const updateDocente = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, dni, nombre, apellido, correo } = req.body;

    const docente = await prisma.docente.update({
      where: { id_docente: parseInt(id) },
      data: { codigo, dni, nombre, apellido },
      include: { usuario: true }
    });

    if (correo) {
      await prisma.usuario.update({
        where: { id_usuario: docente.id_usuario },
        data: { correo }
      });
    }

    res.json({ message: 'Docente actualizado', docente });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// ELIMINAR DOCENTE
// ===============================
export const deleteDocente = async (req, res) => {
  try {
    const { id } = req.params;

    const docente = await prisma.docente.findUnique({
      where: { id_docente: parseInt(id) }
    });

    if (!docente) return res.status(404).json({ error: 'Docente no encontrado' });

    await prisma.docente.delete({ where: { id_docente: parseInt(id) } });
    await prisma.usuario.delete({ where: { id_usuario: docente.id_usuario } });

    res.json({ message: 'Docente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
