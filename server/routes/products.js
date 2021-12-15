const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

// ROTAS DE PRODUTOS
router.get("/", productController.index);
router.get("/:id", productController.show);
router.post("/", productController.store);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);

module.exports = router;
