const Trending = require("../models/trendingModel");

/* ================= GET TRENDING PRODUCTS ================= */
exports.getTrending = async (req, res) => {
  try {
    const products = await Trending.getTrendingProducts();
    res.json(products);
  } catch (err) {
    console.error("Trending fetch error:", err);
    res.status(500).json([]);
  }
};

/* ================= ADD PRODUCT TO TRENDING ================= */
exports.addTrending = async (req, res) => {
  try {
    const { id } = req.params;
    await Trending.addTrending(id);
    res.json({ message: "Product added to trending" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add trending product" });
  }
};

/* ================= REMOVE PRODUCT FROM TRENDING ================= */
exports.removeTrending = async (req, res) => {
  try {
    const { id } = req.params;
    await Trending.removeTrending(id);
    res.json({ message: "Product removed from trending" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove trending product" });
  }
};
