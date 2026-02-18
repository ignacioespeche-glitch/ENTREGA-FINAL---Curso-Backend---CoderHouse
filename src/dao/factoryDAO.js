import { config } from "../config/config.js";

let ProductDao, CartDao, UserDao, TicketDao;

console.log(`Persistence Mode: ${config.persistence}`);

switch (config.persistence) {
  case "mongo":
    const { ProductModel } = await import("../models/product.model.js"); 
    const { default: CartModel } = await import("../models/cart.model.js");
    const { default: TicketModel } = await import("../models/ticket.js");
    
    const { default: MongoDAO } = await import("./mongoDAO.js");

    ProductDao = new MongoDAO(ProductModel);
    CartDao = new MongoDAO(CartModel);
    TicketDao = new MongoDAO(TicketModel);
    
    break;
  case "file":
    break;
}

export { ProductDao, CartDao, TicketDao, UserDao };