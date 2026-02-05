const express = require("express");
const router = express.Router();
const controller = require("../controllers/productAdditionalInfoController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

/* PUBLIC */
router.get("/:productId", controller.getInfoByProduct);

/* ADMIN */
router.post("/:productId", verifyToken, isAdmin, controller.addInfo);
router.delete("/:id", verifyToken, isAdmin, controller.deleteInfo);

module.exports = router;
