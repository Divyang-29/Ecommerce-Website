const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

/* PUBLIC */
router.get("/", categoryController.getCategories);

router.get("/:id", categoryController.getCategoryById);

/* ADMIN */
router.post("/", verifyToken, isAdmin, categoryController.createCategory);
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  categoryController.createCategory,
);

module.exports = router;
