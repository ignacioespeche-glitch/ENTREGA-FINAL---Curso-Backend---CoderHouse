import carritoService from "../services/carritoService.js";

class CarritoController {
  async create(req, res) {
    const cart = await carritoService.create();
    res.json(cart);
  }

  async getById(req, res) {
    const { cid } = req.params;
    const cart = await carritoService.getById(cid);
    res.json(cart);
  }

  async addProduct(req, res) {
    const { cid, pid } = req.params;
    const cart = await carritoService.addProduct(cid, pid);
    res.json(cart);
  }

  async purchase(req, res) {
    try {
      const { cid } = req.params;
      const purchaserEmail = req.user?.email || "test@coder.com";
      const result = await carritoService.purchase(cid, purchaserEmail);
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Error al procesar la compra" });
    }
  }
}

export default new CarritoController();