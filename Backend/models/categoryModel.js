const db = require("../config/db");

/* ================= GET ALL CATEGORIES ================= */
exports.getAll = async () => {
  const result = await db.query(
    "SELECT id, name, slug FROM categories ORDER BY name",
  );
  return result.rows;
};

/* ================= GET CATEGORY BY ID ================= */
exports.getById = async (id) => {
  const result = await db.query(
    "SELECT id, name, slug FROM categories WHERE id = $1",
    [id],
  );
  return result.rows[0];
};

/* ================= CREATE CATEGORY (ADMIN) ================= */
exports.create = async ({ name, slug, image }) => {
  const result = await db.query(
    `INSERT INTO categories (name, slug, image)
     VALUES ($1, $2, $3)
     RETURNING id, name, slug, image`,
    [name, slug, image],
  );
  return result.rows[0];
};
