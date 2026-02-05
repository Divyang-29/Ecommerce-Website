const router = require("express").Router();
const { verifyToken } = require("../middleware/authMiddleware");
const controller = require("../controllers/cartController");

router.get("/", verifyToken, controller.getCart);

module.exports = router;
