import { Router } from "express";
import productoController from "../controllers/productController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", productoController.getAll);
router.post("/", isAdmin, productoController.create);

export default router;