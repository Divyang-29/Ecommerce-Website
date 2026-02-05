const db = require("../config/db");

exports.addToWishlist = async (userId, productId) => {
  const res = await db.query(
    `INSERT INTO wishlists (user_id, product_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING
     RETURNING *`,
    [userId, productId]
  );
  return res.rows[0];
};

exports.removeFromWishlist = async (userId, productId) => {
  await db.query(
    `DELETE FROM wishlists WHERE user_id=$1 AND product_id=$2`,
    [userId, productId]
  );
};

exports.getWishlist = async (userId) => {
  const res = await db.query(
    `
    SELECT 
      p.id,
      p.title,
      p.price,
      p.sale_price,
      pi.image_url
    FROM wishlists w
    JOIN products p ON p.id = w.product_id
    LEFT JOIN LATERAL (
      SELECT image_url
      FROM product_images
      WHERE product_id = p.id
      ORDER BY is_primary DESC, id ASC
      LIMIT 1
    ) pi ON true
    WHERE w.user_id = $1
    ORDER BY w.created_at DESC
    `,
    [userId]
  );

  return res.rows;
};

