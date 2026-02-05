const FAQ = require("../models/faqModel");

exports.getFaqsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const data = await FAQ.getByCategory(categoryId);
  res.json(data);
};

exports.createFaq = async (req, res) => {
  const { category_id, question, answer } = req.body;

  if (!category_id || !question || !answer) {
    return res.status(400).json({
      message: "All fields required",
    }); 
  }

  const created = await FAQ.create({
    category_id,
    question,
    answer,
  });

  res.status(201).json(created);
};

exports.deleteFaq = async (req, res) => {
  await FAQ.deleteById(req.params.id);
  res.json({ message: "FAQ deleted" });
};
