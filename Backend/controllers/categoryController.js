const Category = require("../models/categoryModel");

/* ================= GET CATEGORIES ================= */
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

/* ================= CREATE CATEGORY (ADMIN) ================= */
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? `/uploads/categories/${req.file.filename}` : null;

    if (!name) {
      return res.status(400).json({ message: "Category name required" });
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const category = await Category.create({
      name,
      slug,
      image,
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Failed to create category" });
  }
};

/* ================= GET CATEGORY BY ID ================= */
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.getById(id); 

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch category" });
  }
};
