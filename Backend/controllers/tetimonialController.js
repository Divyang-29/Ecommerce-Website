const TestimonialModel = require("../models/testimonialModel");

const createTestimonial = async (req, res) => {
  try {
    const testimonial = await TestimonialModel.create(req.body);
    res.status(201).json({ success: true, testimonial });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await TestimonialModel.findAllActive();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const toggleTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    const updated = await TestimonialModel.updateStatus(id, is_active);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    await TestimonialModel.delete(req.params.id);
    res.json({ message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTestimonial,
  getTestimonials,
  toggleTestimonial,
  deleteTestimonial
};
