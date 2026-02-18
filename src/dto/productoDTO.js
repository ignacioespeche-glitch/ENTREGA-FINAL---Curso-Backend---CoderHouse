  export default class ProductoDTO {
    constructor(product) {
      this.id = product._id || product.id;
      this.title = product.title;
      this.price = product.price;
      this.stock = product.stock;
    }
  }
