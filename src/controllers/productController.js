import { productService } from "../services/ProductService.js";

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await productService.getProducts();
      res.status(200).json({ status: "success", payload: products });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const { pid } = req.params;
      const product = await productService.getProductById(pid);
      res.status(200).json({ status: "success", payload: product });
    } catch (error) {
      res.status(404).json({ status: "error", message: error.message });
    }
  }

  async createProduct(req, res) {
    try {
      const newProduct = await productService.createProduct(
        req.body,
        req.user
      );

      res.status(201).json({
        status: "success",
        payload: newProduct
      });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const { pid } = req.params;
      const updated = await productService.updateProduct(pid, req.body);

      res.status(200).json({
        status: "success",
        payload: updated
      });
    } catch (error) {
      res.status(404).json({ status: "error", message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { pid } = req.params;

      const result = await productService.deleteProduct(
        pid,
        req.user
      );

      res.status(200).json({
        status: "success",
        message: result.message
      });
    } catch (error) {
      res.status(403).json({ status: "error", message: error.message });
    }
  }
}

export const productController = new ProductController();