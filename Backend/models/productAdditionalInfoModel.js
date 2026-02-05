const db = require("../config/db");

/* ================= ADD INFO ================= */
exports.addInfo = async ({ product_id, label, value }) => {
  const result = await db.query(
    `INSERT INTO product_additional_info (product_id, label, value)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [product_id, label, value]
  );
  return result.rows[0];
};

/* ================= GET INFO BY PRODUCT ================= */
exports.getByProduct = async (productId) => {
  const result = await db.query(
    `SELECT id, label, value
     FROM product_additional_info
     WHERE product_id = $1
     ORDER BY id`,
    [productId]
  );
  return result.rows;
};

/* ================= DELETE INFO ================= */
exports.deleteById = async (id) => {
  await db.query(
    `DELETE FROM product_additional_info WHERE id = $1`,
    [id]
  );
};
