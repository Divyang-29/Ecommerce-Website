const Privacy = require("../models/privacyModel");

exports.getPrivacyPolicy = async (req, res) => {
  const data = await Privacy.getAllActive();
  res.json(data);
};

exports.createPrivacySection = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }

  const created = await Privacy.create({ title, content });
  res.status(201).json(created);
};
