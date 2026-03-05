import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import swaggerUiExpress from "swagger-ui-express";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import carritoRoutes from "./routes/carritoRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

import { logger } from "./config/logger.js";
import { swaggerSpecs } from "./docs/swagger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.http(`${req.method} - ${req.url}`);
  next();
});

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", carritoRoutes);
app.use("/api/payments", paymentRoutes);

app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpecs));

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({
    status: "error",
    message: "Error interno del servidor"
  });
});

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

if (!process.env.JEST_WORKER_ID) {
  if (!MONGO_URI) {
    logger.fatal("MONGO_URI no está definida en el .env");
    process.exit(1);
  }

  mongoose
    .connect(MONGO_URI)
    .then(() => {
      logger.info("Conectado a MongoDB");

      app.listen(PORT, () => {
        logger.info(`Server escuchando en puerto ${PORT}`);
      });
    })
    .catch((error) => {
      logger.fatal(`Error conectando a MongoDB: ${error.message}`);
      process.exit(1);
    });
}

export default app;