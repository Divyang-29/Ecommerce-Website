const router = require("express").Router();
const { verifyToken } = require("../middleware/authMiddleware");
const controller = require("../controllers/cartItemController");

router.post("/items", verifyToken, controller.addItem);
router.put("/items/:id", verifyToken, controller.updateQuantity);
router.delete("/items/:id", verifyToken, controller.deleteItem);

module.exports = router;
