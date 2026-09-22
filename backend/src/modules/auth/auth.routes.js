const express = require("express");

const authController = require("./auth.controller");
const {
  validateRegister,
  validateLogin,
} = require("./auth.validation");

const {
  authenticate,
} = require("./auth.middleware");

const router = express.Router();

router.post(
  "/register",
  validateRegister,
  authController.register
);

router.post(
  "/login",
  validateLogin,
  authController.login
);

router.get(
  "/me",
  authenticate,
  (req, res) => {
    res.status(200).json({
      message: "Authentication successful",
      user: req.user,
    });
  }
);

module.exports = router;