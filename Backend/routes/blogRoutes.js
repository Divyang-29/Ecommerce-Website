const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

/* PUBLIC */
router.get("/", blogController.getBlogs);
router.get("/search", blogController.searchBlogs);
router.get("/:slug", blogController.getBlogDetail);

/* ADMIN */
router.post("/", verifyToken, isAdmin, blogController.createBlog);

module.exports = router;
