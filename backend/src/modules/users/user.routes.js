const express = require("express");

const userController = require("./user.controller");

const {
  validateCreateUser,
  validateUpdateUser,
} = require("./user.validation");

const {
  authenticate,
  authorize,
} = require("../auth/auth.middleware");

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize("admin"),
  userController.getAllUsers
);

router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  userController.getUserById
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validateCreateUser,
  userController.createUser
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validateUpdateUser,
  userController.updateUser
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  userController.deleteUser
);

module.exports = router;