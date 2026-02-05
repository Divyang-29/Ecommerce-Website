const Review = require("../models/reviewModel");

/* ================= ADD REVIEW ================= */
exports.addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, review_text } = req.body;
    const user_id = req.user.id;

    if (!rating || !review_text) {
      return res.status(400).json({
        message: "Rating and review text are required",
      });
    }

    const review = await Review.create({
      product_id: productId,
      user_id,
      rating,
      review_text,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to add review",
    });
  }
};

/* ================= GET REVIEWS ================= */
exports.getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.getByProduct(productId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch reviews",
    });
  }
};

/* ================= DELETE REVIEW (ADMIN) ================= */
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.deleteById(id);
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete review",
    });
  }
};
