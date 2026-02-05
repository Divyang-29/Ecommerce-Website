const db = require("../config/db");

/* ================= GET ALL SECTIONS ================= */
exports.getAll = async () => {
  const result = await db.query(
    `SELECT id, title, description
     FROM about_sections
     ORDER BY position ASC`
  );
  return result.rows;
};

/* ================= ADD SECTION ================= */
exports.create = async ({ title, description, position }) => {
  const result = await db.query(
    `INSERT INTO about_sections (title, description, position)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, description, position]
  );
  return result.rows[0];
};

/* ================= DELETE SECTION ================= */
exports.deleteById = async (id) => {
  await db.query(
    `DELETE FROM about_sections WHERE id = $1`,
    [id]
  );
};
