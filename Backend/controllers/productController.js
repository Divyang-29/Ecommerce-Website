const Product = require("../models/productModel");

/* ================= CREATE PRODUCT (ADMIN) ================= */
exports.createProduct = async (req, res) => {
  try {
    // 🔥 Auto-generated fields
    const sku = generateSKU(req.body.category_id);
    const expected_delivery = "3–5 business days";

    const product = await Product.createProduct({
      ...req.body,
      sku,
      expected_delivery,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create product" });
  }
};

function generateSKU(categoryId) {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `CAT${categoryId}-${year}-${random}`;
}

/* ================= GET ALL PRODUCTS ================= */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* ================= GET PRODUCT DETAIL ================= */
exports.getProductDetail = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const images = await Product.getImages(productId).catch(() => []);
    const sizes = await Product.getSizes(productId).catch(() => []);
    const colors = await Product.getColors(productId).catch(() => []);

    res.json({
      ...product,
      images: images || [],
      sizes: sizes || [],
      colors: colors || [],
    });
  } catch (err) {
    console.error("❌ getProductDetail failed:", err);
    res.status(500).json({ message: "Failed to fetch product details" });
  }
};

/* ================= ADD IMAGE ================= */
exports.addImage = async (req, res) => {
  await Product.addImage(req.params.id, req.body);
  res.json({ message: "Image added" });
};

/* ================= ADD SIZE ================= */
exports.addSize = async (req, res) => {
  const { size, stock } = req.body;
  await Product.addSize(req.params.id, size, stock);
  res.json({ message: "Size added" });
};

/* ================= ADD COLOR ================= */
exports.addColor = async (req, res) => {
  await Product.addColor(req.params.id, req.body.color_name);
  res.json({ message: "Color added" });
};
