const router = require("express").Router();
const controller = require("../controllers/faqController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/:categoryId", controller.getFaqsByCategory);
router.post("/", verifyToken, isAdmin, controller.createFaq);
router.delete("/:id", verifyToken, isAdmin, controller.deleteFaq);

module.exports = router;
