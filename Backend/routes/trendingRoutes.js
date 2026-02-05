const express = require("express");
const router = express.Router();
const trendingController = require("../controllers/trendingController");

// ✅ correct import
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// GET trending products (PUBLIC)
router.get("/", trendingController.getTrending);

// ADD product to trending (ADMIN)
router.post("/:id", verifyToken, isAdmin, trendingController.addTrending);

// REMOVE product from trending (ADMIN)
router.delete("/:id", verifyToken, isAdmin, trendingController.removeTrending);

module.exports = router;
