import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        message: "No autorizado - Falta token"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Token inválido"
      });
    }

    const decoded = jwt.verify(token, "coderSecret"); 

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Token inválido o expirado"
    });
  }
};