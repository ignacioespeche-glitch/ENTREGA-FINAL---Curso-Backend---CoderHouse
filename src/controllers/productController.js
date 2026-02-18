import productoService from "../services/ProductService.js";
import ProductoDTO from "../dto/productoDTO.js";

class ProductoController {
  async getAll(req, res) {
    const products = await productoService.getAll();
    const dtoProducts = products.map(p => new ProductoDTO(p));
    res.json(dtoProducts);
  }

  async create(req, res) {
    const product = await productoService.create(req.body);
    res.status(201).json(product);
  }
}

export default new ProductoController();
