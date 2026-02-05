const db = require("../config/db");

/* ================= ADD TO TRENDING ================= */
exports.addTrending = async (productId) => {
  await db.query(
    `INSERT INTO trending_products (product_id)
     VALUES ($1)
     ON CONFLICT (product_id) DO NOTHING`,
    [productId]
  );
};

/* ================= REMOVE FROM TRENDING ================= */
exports.removeTrending = async (productId) => {
  await db.query(
    `DELETE FROM trending_products WHERE product_id = $1`,
    [productId]
  );
};

/* ================= GET TRENDING PRODUCTS ================= */
exports.getTrendingProducts = async () => {
  const result = await db.query(`
    SELECT 
      p.id,
      p.title,
      p.price,
      p.sale_price,
      pi.image_url
    FROM trending_products t
    JOIN products p ON p.id = t.product_id
    LEFT JOIN product_images pi 
      ON pi.product_id = p.id AND pi.is_primary = true
    ORDER BY t.created_at DESC
  `);

  return result.rows;
};
