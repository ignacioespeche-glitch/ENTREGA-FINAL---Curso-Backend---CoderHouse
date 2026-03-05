import { Router } from "express";
import { productController } from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestión de productos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 */
router.get("/", productController.getProducts);

/**
 * @swagger
 * /api/products/{pid}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:pid", productController.getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto (requiere autenticación)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *       401:
 *         description: No autorizado
 */
router.post("/", authMiddleware, productController.createProduct);

/**
 * @swagger
 * /api/products/{pid}:
 *   put:
 *     summary: Actualizar un producto (requiere autenticación)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 */
router.put("/:pid", authMiddleware, productController.updateProduct);

/**
 * @swagger
 * /api/products/{pid}:
 *   delete:
 *     summary: Eliminar un producto (requiere autenticación)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:pid", authMiddleware, productController.deleteProduct);

export default router;