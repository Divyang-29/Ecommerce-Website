const router = require("express").Router();
const controller = require("../controllers/termsController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/", controller.getTerms);
router.post("/", verifyToken, isAdmin, controller.createTerm);

module.exports = router;
