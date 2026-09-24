const authService = require("./auth.service");

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json({
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(
      email,
      password
    );

    res.status(200).json({
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    console.error(error.message);

    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};