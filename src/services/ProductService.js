import { ProductModel } from "../models/product.model.js";
import { sendMail } from "../utils/mailing.js";

class ProductService {
  async getProducts(filter = {}, options = {}) {
    return await ProductModel.find(filter);
  }

  async getProductById(pid) {
    const product = await ProductModel.findById(pid);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  async createProduct(productData, user) {
    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    const newProduct = {
      ...productData,
      owner: user.id, // 🔥 usamos id (del JWT)
      isPremium: user.role === "premium"
    };

    return await ProductModel.create(newProduct);
  }

  async updateProduct(pid, updateData, user) {
    const product = await ProductModel.findById(pid);

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    if (
      user.role !== "admin" &&
      product.owner.toString() !== user.id.toString()
    ) {
      throw new Error("No autorizado para modificar este producto");
    }

    return await ProductModel.findByIdAndUpdate(pid, updateData, {
      new: true
    });
  }

  async deleteProduct(pid, user) {
    const product = await ProductModel.findById(pid);

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    if (
      user.role !== "admin" &&
      product.owner.toString() !== user.id.toString()
    ) {
      throw new Error("No autorizado para eliminar este producto");
    }

    if (
      user.role === "premium" &&
      product.owner.toString() === user.id.toString()
    ) {
      await sendMail(
        user.email,
        "Producto eliminado",
        `Hola, tu producto "${product.title}" fue eliminado correctamente del sistema.`
      );
    }

    await ProductModel.findByIdAndDelete(pid);

    return { message: "Producto eliminado correctamente" };
  }
}

export const productService = new ProductService();