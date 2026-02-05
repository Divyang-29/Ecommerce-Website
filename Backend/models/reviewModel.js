const db = require("../config/db");

/* ================= ADD REVIEW ================= */
exports.create = async ({ product_id, user_id, rating, review_text }) => {
  const result = await db.query(
    `INSERT INTO reviews (product_id, user_id, rating, review_text)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [product_id, user_id, rating, review_text]
  );
  return result.rows[0];
};

/* ================= GET REVIEWS BY PRODUCT ================= */
exports.getByProduct = async (productId) => {
  const result = await db.query(
    `SELECT r.id, r.rating, r.review_text, r.created_at,
            u.first_name, u.last_name
     FROM reviews r
     LEFT JOIN users u ON r.user_id = u.id
     WHERE r.product_id = $1
     ORDER BY r.created_at DESC`,
    [productId]
  );
  return result.rows;
};

/* ================= DELETE REVIEW ================= */
exports.deleteById = async (id) => {
  await db.query(
    `DELETE FROM reviews WHERE id = $1`,
    [id]
  );
};
