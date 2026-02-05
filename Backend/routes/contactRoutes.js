const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

/* PUBLIC */
router.post("/", contactController.submitMessage);

/* ADMIN */
router.get("/", verifyToken, isAdmin, contactController.getMessages);
router.delete("/:id", verifyToken, isAdmin, contactController.deleteMessage);

module.exports = router;
