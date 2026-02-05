const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

/* PUBLIC */
router.get("/", aboutController.getAboutPage);

/* ADMIN */
router.post("/", verifyToken, isAdmin, aboutController.addSection);
router.delete("/:id", verifyToken, isAdmin, aboutController.deleteSection);

module.exports = router;
