import usuarioService from "../services/usuarioService.js";
import UsuarioDTO from "../dto/usuarioDTO.js";

class UsuarioController {
  async current(req, res) {
    const user = await usuarioService.getById(req.user.id);
    res.json(new UsuarioDTO(user));
  }
}

export default new UsuarioController();
