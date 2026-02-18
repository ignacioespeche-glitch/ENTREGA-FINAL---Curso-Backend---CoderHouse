import { ProductDao } from "../dao/factoryDAO.js";

class ProductoService {
  async getAll() {
    return await ProductDao.getAll();
  }

  async getById(id) {
    return await ProductDao.getById(id);
  }

  async create(product) {
    return await ProductDao.create(product);
  }

  async update(id, product) {
    return await ProductDao.update(id, product);
  }

  async delete(id) {
    return await ProductDao.delete(id);
  }
}

export default new ProductoService();