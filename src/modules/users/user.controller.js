const userService = require("./user.service");

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    res.status(500).json({
      message: "Failed to create user",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.updateUser(id, req.body);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    res.status(500).json({
      message: "Failed to update user",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.deleteUser(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "23503") {
      return res.status(409).json({
        message: "Cannot delete user because related records exist",
      });
    }

    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};