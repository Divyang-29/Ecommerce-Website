const router = require("express").Router();
const controller = require("../controllers/faqCategoryController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/", controller.getCategories);
router.post("/", verifyToken, isAdmin, controller.createCategory);

module.exports = router;
