const express = require("express");
const { chat } = require("./ai.controller");

const router = express.Router();

router.post("/chat", chat);

module.exports = router;