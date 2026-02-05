const express = require("express");

const {
  createTestimonial,
  getTestimonials,
  toggleTestimonial,
  deleteTestimonial
} = require("../controllers/tetimonialController");

const {
  verifyToken,
  isAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.get("/", getTestimonials);

// Admin
router.post("/", verifyToken, isAdmin, createTestimonial);
router.put("/:id/status", verifyToken, isAdmin, toggleTestimonial);
router.delete("/:id", verifyToken, isAdmin, deleteTestimonial);

module.exports = router;
