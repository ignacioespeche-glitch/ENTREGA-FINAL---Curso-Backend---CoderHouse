import { ProductModel } from "../models/product.model.js";

export default class ProductDAO {
  getAll = () => {
    return ProductModel.find();
  };

  getById = (id) => {
    return ProductModel.findById(id);
  };

  create = (product) => {
    return ProductModel.create(product);
  };

  update = (id, product) => {
    return ProductModel.findByIdAndUpdate(id, product, { new: true });
  };

  delete = (id) => {
    return ProductModel.findByIdAndDelete(id);
  };
}
