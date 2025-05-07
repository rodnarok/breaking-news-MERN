import authService from "../services/auth.service.js";

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.loginService({ email, password });
    console.log(`o token é: ${token}`);
    return res.send(token);
  } catch (e) {
    return res.status(401).send(e.message);
  }
};

export default { loginController };
