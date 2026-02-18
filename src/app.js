import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import carritoRoutes from "./routes/carritoRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", carritoRoutes);

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI no está definida en el .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`Server escuchando en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error conectando a MongoDB:", error.message);
  });