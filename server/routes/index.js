const express = require("express");
const router = express.Router();
const produtosRouter = require("./products");

// ROTA PREINCIPAL (Home)
router.use("/produtos", produtosRouter);

module.exports = router;
