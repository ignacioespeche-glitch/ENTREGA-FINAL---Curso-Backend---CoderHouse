import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/mailing.js";

class UsuarioService {
  async register(userData) {
    const { first_name, last_name, email, password } = userData;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      password: hashedPassword
    });

    return newUser;
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

    user.last_connection = new Date();
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token };
  }

  async getById(id) {
    return await UserModel.findById(id);
  }

  async getAll() {
    return await UserModel.find();
  }

  async deleteInactiveUsers() {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const inactiveUsers = await UserModel.find({
      last_connection: { $lt: twoDaysAgo }
    });

    for (const user of inactiveUsers) {
      await sendMail(
        user.email,
        "Cuenta eliminada por inactividad",
        `Hola ${user.first_name}, tu cuenta fue eliminada por inactividad.`
      );
    }

    const result = await UserModel.deleteMany({
      last_connection: { $lt: twoDaysAgo }
    });

    return {
      deletedCount: result.deletedCount
    };
  }
}

export default new UsuarioService();