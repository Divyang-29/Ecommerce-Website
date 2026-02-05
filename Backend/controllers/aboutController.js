const About = require("../models/aboutModel");

/* ================= GET ABOUT PAGE ================= */
exports.getAboutPage = async (req, res) => {
  try {
    const sections = await About.getAll();
    res.json(sections);
  } catch (err) {
    res.status(500).json({
      message: "Failed to load About Us content",
    });
  }
};

/* ================= ADD SECTION (ADMIN) ================= */
exports.addSection = async (req, res) => {
  try {
    const { title, description, position } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description required",
      });
    }

    const section = await About.create({
      title,
      description,
      position: position || 0,
    });

    res.status(201).json(section);
  } catch (err) {
    res.status(500).json({
      message: "Failed to add section",
    });
  }
};

/* ================= DELETE SECTION (ADMIN) ================= */
exports.deleteSection = async (req, res) => {
  try {
    await About.deleteById(req.params.id);
    res.json({ message: "Section deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete section",
    });
  }
};
