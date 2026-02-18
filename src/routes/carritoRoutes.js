import { Router } from "express";
import carritoController from "../controllers/carritoController.js";

const router = Router();

router.post("/", carritoController.create);
router.get("/:cid", carritoController.getById);
router.post("/:cid/product/:pid", carritoController.addProduct);

router.post("/:cid/purchase", carritoController.purchase);

export default router;