const users = new Map();

class UsuarioService {
  async getById(id) {
    return users.get(id);
  }
}

export default new UsuarioService();
