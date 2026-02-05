const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

/* PUBLIC */
router.get("/:productId", reviewController.getReviewsByProduct);

/* USER */
router.post("/:productId", verifyToken, reviewController.addReview);

/* ADMIN */
router.delete("/:id", verifyToken, isAdmin, reviewController.deleteReview);

module.exports = router;
