const express = require("express");
const router = express.Router();

// ✅ IMPORT CONTROLLER PROPERLY
const orderController = require("../controllers/orderController");

// ✅ IMPORT BOTH MIDDLEWARES
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

/* ================= USER ================= */
router.post("/checkout", verifyToken, orderController.checkout);

/* ================= ADMIN ================= */
router.get("/", verifyToken, isAdmin, orderController.getAllOrders);

module.exports = router;
