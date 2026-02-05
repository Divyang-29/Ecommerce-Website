const express = require("express");
const router = express.Router();

const { trackOrder } = require("../controllers/shipmentController");

// ✅ TRACK ORDER BY TRACKING ID
router.get("/track/:trackingId", trackOrder);

module.exports = router;
