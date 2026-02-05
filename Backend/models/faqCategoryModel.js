const db = require("../config/db");

exports.getAll = async () => {
  const result = await db.query(
    "SELECT * FROM faq_categories ORDER BY id"
  );
  return result.rows;
};

exports.create = async ({ title, icon }) => {
  const result = await db.query(
    `INSERT INTO faq_categories (title, icon)
     VALUES ($1, $2)
     RETURNING *`,
    [title, icon]
  );
  return result.rows[0];
};
