const router = require("express").Router();
const controller = require("../controllers/privacyController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/", controller.getPrivacyPolicy);
router.post("/", verifyToken, isAdmin, controller.createPrivacySection);

module.exports = router;
