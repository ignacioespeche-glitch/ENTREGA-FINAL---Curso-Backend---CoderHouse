import usuarioService from "../services/usuarioService.js";

export const register = async (req, res) => {
  try {
    const newUser = await usuarioService.register(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token } = await usuarioService.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};