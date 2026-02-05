const db = require("../config/db");

exports.getByCategory = async (categoryId) => {
  const result = await db.query(
    `SELECT id, question, answer
     FROM faqs
     WHERE category_id = $1 AND is_active = true
     ORDER BY id`,
    [categoryId]
  );
  return result.rows;
};

exports.create = async ({ category_id, question, answer }) => {
  const result = await db.query(
    `INSERT INTO faqs (category_id, question, answer)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [category_id, question, answer]
  );
  return result.rows[0];
};

exports.deleteById = async (id) => {
  await db.query("DELETE FROM faqs WHERE id = $1", [id]);
};
