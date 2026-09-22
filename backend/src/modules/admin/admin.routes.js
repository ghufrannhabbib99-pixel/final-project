const express = require("express");

const adminController = require("./admin.controller");

const {
  authenticate,
  authorize,
} = require("../auth/auth.middleware");

const router = express.Router();

router.get(
  "/dashboard",
  authenticate,
  authorize("admin"),
  adminController.getDashboardStats
);

module.exports = router;