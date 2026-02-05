const express = require("express");
const router = express.Router();

const { updateShipmentStatus } = require("../controllers/shipmentAdminController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// ✅ ADMIN UPDATE SHIPMENT STATUS
router.put("/:orderId", verifyToken, isAdmin, updateShipmentStatus);

module.exports = router;
