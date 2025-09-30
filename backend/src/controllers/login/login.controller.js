// backend/src/controllers/login.controller.js
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../../utils/generateToken.js';

const prisma = new PrismaClient();

// Login temporal sin hashing
export const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const user = await prisma.usuario.findUnique({
      where: { correo }
    }); 

    if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

    // Comparación en texto plano
    if (user.password !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generar JWT
    const token = generateToken(user); 
    res.json({ token, usuario: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el login" });
  }
};
