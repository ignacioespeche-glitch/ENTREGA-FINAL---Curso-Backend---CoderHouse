export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Acceso denegado: Se requiere rol de Admin" });
  }
  next();
};

export const isUser = (req, res, next) => {
  if (req.user?.role !== "user") {
    return res.status(403).json({ error: "Acceso denegado: Se requiere rol de Usuario" });
  }
  next();
};