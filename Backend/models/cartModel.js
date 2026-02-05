const db = require("../config/db");

/* ================= GET OR CREATE CART ================= */
exports.getOrCreateCart = async (userId) => {
  const existing = await db.query(
    "SELECT * FROM carts WHERE user_id = $1 AND status = 'active'",
    [userId]
  );

  if (existing.rows.length) return existing.rows[0];

  const created = await db.query(
    "INSERT INTO carts (user_id) VALUES ($1) RETURNING *",
    [userId]
  );

  return created.rows[0];
};

/* ================= GET CART ITEMS ================= */
exports.getCartItems = async (cartId) => {
  const result = await db.query(
    `
    SELECT
      ci.id,
      ci.product_id,
      ci.quantity,
      ci.price,
      ci.size,
      ci.color,
      p.title,
      p.price AS original_price,
      p.sale_price,
      pi.image_url
    FROM cart_items ci
    JOIN products p ON p.id = ci.product_id
    LEFT JOIN product_images pi
      ON pi.product_id = p.id AND pi.is_primary = true
    WHERE ci.cart_id = $1
    ORDER BY ci.id DESC
    `,
    [cartId]
  );

  return result.rows;
};
