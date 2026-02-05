const db = require("../config/db");

exports.getAllActive = async () => {
  const result = await db.query(
    `SELECT id, title, content
     FROM terms_conditions
     WHERE is_active = true
     ORDER BY id`
  );
  return result.rows;
};

exports.create = async ({ title, content }) => {
  const result = await db.query(
    `INSERT INTO terms_conditions (title, content)
     VALUES ($1, $2)
     RETURNING *`,
    [title, content]
  );
  return result.rows[0];
};
