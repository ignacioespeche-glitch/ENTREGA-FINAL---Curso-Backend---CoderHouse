import { Router } from "express";

const usuarioRoutes = Router();

/**
 * GET /api/users
 */
usuarioRoutes.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Ruta de usuarios funcionando correctamente",
  });
});

/**
 * POST /api/users
 */
usuarioRoutes.post("/", (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos obligatorios",
    });
  }

  res.status(201).json({
    status: "success",
    message: "Usuario creado correctamente",
    data: {
      nombre,
      email,
    },
  });
});

/**
 * GET /api/users/:id
 */
usuarioRoutes.get("/:id", (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    status: "success",
    message: `Usuario con id ${id}`,
  });
});

/**
 * PUT /api/users/:id
 */
usuarioRoutes.put("/:id", (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    status: "success",
    message: `Usuario con id ${id} actualizado`,
  });
});

/**
 * DELETE /api/users/:id
 */
usuarioRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    status: "success",
    message: `Usuario con id ${id} eliminado`,
  });
});

export default usuarioRoutes;
