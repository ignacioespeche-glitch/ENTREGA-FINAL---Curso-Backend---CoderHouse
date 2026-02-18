import { CartDao, ProductDao, TicketDao } from "../dao/factoryDAO.js"; 
import { sendMail } from "../utils/mailing.js";
import { sendSMS } from "../utils/sms.js"; 
import crypto from "crypto";

class CarritoService {

  async getById(cid) {
    return await CartDao.getById(cid);
  }

  async create() {
    return await CartDao.create({ products: [] });
  }

  async addProduct(cid, pid) {
    const cart = await CartDao.getById(cid);
    if (!cart) throw new Error("Carrito no encontrado");

    const productIndex = cart.products.findIndex(
      (p) => p.product._id.toString() === pid || p.product.toString() === pid
    );

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    return await CartDao.update(cid, { products: cart.products });
  }

  async purchase(cid, purchaserEmail) {
    const cart = await CartDao.getById(cid);
    if (!cart) return { error: "Carrito inexistente" };

    const purchased = [];
    const notPurchased = [];
    let amount = 0;

    for (const item of cart.products) {
      const productId = item.product._id || item.product;
      
      const productDB = await ProductDao.getById(productId);
      const quantity = item.quantity;

      if (productDB && productDB.stock >= quantity) {
        await ProductDao.update(productId, {
            stock: productDB.stock - quantity
        });
        
        amount += productDB.price * quantity;
        purchased.push(item);
      } else {
        notPurchased.push(item);
      }
    }

    if (purchased.length === 0) {
      return { status: "sin stock", notPurchased: notPurchased.map(i => i.product) };
    }

    const ticket = await TicketDao.create({
      code: crypto.randomUUID(),
      purchase_datetime: new Date(),
      amount,
      purchaser: purchaserEmail
    });

    try {
        await sendMail(purchaserEmail, ticket);
        await sendSMS(purchaserEmail, "Compra exitosa");
    } catch (e) {
        console.log("Error notificando:", e.message);
    }

    await CartDao.update(cid, { products: notPurchased });

    return {
      status: "success",
      ticket,
      not_purchased_products: notPurchased.map(i => i.product._id || i.product)
    };
  }
}

export default new CarritoService();