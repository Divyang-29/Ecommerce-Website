const Info = require("../models/productAdditionalInfoModel");

/* ================= ADD INFO (ADMIN) ================= */
exports.addInfo = async (req, res) => {
  try {
    const { productId } = req.params;
    const { label, value } = req.body;

    if (!label || !value) {
      return res.status(400).json({
        message: "Label and value are required",
      });
    }

    const info = await Info.addInfo({ 
      product_id: productId,
      label,
      value,
    });

    res.status(201).json(info);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to add additional info",
    });
  }
};

/* ================= GET INFO ================= */
exports.getInfoByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const info = await Info.getByProduct(productId);
    res.json(info);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch additional info",
    });
  }
};

/* ================= DELETE INFO (ADMIN) ================= */
exports.deleteInfo = async (req, res) => {
  try {
    const { id } = req.params;
    await Info.deleteById(id);
    res.json({ message: "Additional info deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete info",
    });
  }
};
