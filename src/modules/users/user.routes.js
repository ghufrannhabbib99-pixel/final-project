const express = require("express");

const userController = require("./user.controller");

const {
  validateCreateUser,
  validateUpdateUser,
} = require("./user.validation");

const router = express.Router();

router.get(
  "/",
  userController.getAllUsers
);

router.get(
  "/:id",
  userController.getUserById
);

router.post(
  "/",
  validateCreateUser,
  userController.createUser
);

router.patch(
  "/:id",
  validateUpdateUser,
  userController.updateUser
);

router.delete(
  "/:id",
  userController.deleteUser
);

module.exports = router;