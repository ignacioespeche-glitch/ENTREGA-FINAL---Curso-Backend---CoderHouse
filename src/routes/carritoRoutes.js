import { Router } from "express";
import carritoController from "../controllers/carritoController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Gestión de carritos y compras
 */

/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Crear un nuevo carrito
 *     tags: [Carts]
 *     responses:
 *       201:
 *         description: Carrito creado correctamente
 */
router.post("/", carritoController.create);

/**
 * @swagger
 * /api/carts/{cid}:
 *   get:
 *     summary: Obtener carrito por ID
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito obtenido correctamente
 *       404:
 *         description: Carrito no encontrado
 */
router.get("/:cid", carritoController.getById);

/**
 * @swagger
 * /api/carts/{cid}/product/{pid}:
 *   post:
 *     summary: Agregar producto al carrito
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto agregado al carrito
 *       404:
 *         description: Carrito o producto no encontrado
 */
router.post("/:cid/product/:pid", carritoController.addProduct);

/**
 * @swagger
 * /api/carts/{cid}/purchase:
 *   post:
 *     summary: Finalizar compra del carrito
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Compra realizada correctamente
 *       400:
 *         description: Error al procesar la compra
 */
router.post("/:cid/purchase", carritoController.purchase);

export default router;