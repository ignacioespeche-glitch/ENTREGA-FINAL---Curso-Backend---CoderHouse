export default class UsuarioDTO {
  constructor(user) {
    this.email = user.email;
    this.role = user.role;
  }
}
