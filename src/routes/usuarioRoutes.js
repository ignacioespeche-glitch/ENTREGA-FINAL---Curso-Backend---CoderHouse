import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { sendMail } from "../utils/mailing.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /api/usuarios/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: El usuario ya existe
 */
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "El usuario ya existe"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: "user"
    });

    res.status(201).json({
      status: "success",
      message: "Usuario registrado correctamente",
      payload: newUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Credenciales incorrectas
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        status: "error",
        message: "Contraseña incorrecta"
      });
    }

    user.last_connection = new Date();
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      "coderSecret",
      { expiresIn: "1h" }
    );

    res.json({
      status: "success",
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios (solo admin)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       403:
 *         description: Acceso solo para admin
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        status: "error",
        message: "Acceso solo para admin"
      });
    }

    const users = await userModel.find().select("-password");

    res.json({
      status: "success",
      payload: users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/usuarios/inactive:
 *   delete:
 *     summary: Eliminar usuarios inactivos (más de 2 días) - solo admin
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Usuarios inactivos eliminados
 *       403:
 *         description: Acceso solo para admin
 */
router.delete("/inactive", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        status: "error",
        message: "Acceso solo para admin"
      });
    }

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const result = await userModel.deleteMany({
      last_connection: { $lt: twoDaysAgo }
    });

    res.json({
      status: "success",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/usuarios/{uid}/role:
 *   put:
 *     summary: Cambiar rol de usuario (admin)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/:uid/role", authMiddleware, async (req, res) => {
  try {
    const { uid } = req.params;
    const { role } = req.body;

    const user = await userModel.findById(uid);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.role = role;
    await user.save();

    res.json({
      status: "success",
      message: "Rol actualizado correctamente",
      payload: user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;