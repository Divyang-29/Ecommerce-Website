const Category = require("../models/faqCategoryModel");

exports.getCategories = async (req, res) => {
  const data = await Category.getAll();
  res.json(data);
};

exports.createCategory = async (req, res) => {
  const { title, icon } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title required" });
  }
  const created = await Category.create({ title, icon });
  res.status(201).json(created);
};
