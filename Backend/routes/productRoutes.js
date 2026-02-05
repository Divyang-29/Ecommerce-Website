const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

/* PUBLIC */
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductDetail);

/* ADMIN */
router.post("/", verifyToken, isAdmin, productController.createProduct);
router.post("/:id/images", verifyToken, isAdmin, productController.addImage);
router.post("/:id/sizes", verifyToken, isAdmin, productController.addSize);
router.post("/:id/colors", verifyToken, isAdmin, productController.addColor);

module.exports = router;
