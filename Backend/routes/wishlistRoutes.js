const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, wishlistController.getWishlist);
router.post("/", verifyToken, wishlistController.add);
router.delete("/:productId", verifyToken, wishlistController.remove);

module.exports = router;
