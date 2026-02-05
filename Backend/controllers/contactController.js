const Contact = require("../models/contactModel");

/* ================= SUBMIT CONTACT FORM ================= */
exports.submitMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email, and message are required",
      });
    }

    const saved = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: saved,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to send message",
    });
  }
};

/* ================= GET MESSAGES (ADMIN) ================= */
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.getAll();
    res.json(messages);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
};

/* ================= DELETE MESSAGE (ADMIN) ================= */
exports.deleteMessage = async (req, res) => {
  try {
    await Contact.deleteById(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete message",
    });
  }
};
