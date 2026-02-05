const Terms = require("../models/termsModel");

exports.getTerms = async (req, res) => {
  const data = await Terms.getAllActive();
  res.json(data);
};

exports.createTerm = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content required",
    });
  }

  const created = await Terms.create({ title, content  });
  res.status(201).json(created);
};
