const db = require("../config/db");

/* ================= CREATE MESSAGE ================= */
exports.create = async ({ name, email, phone, subject, message }) => {
  const result = await db.query(
    `INSERT INTO contact_messages (name, email, phone, subject, message)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, email, phone, subject, message]
  );
  return result.rows[0];
};

/* ================= GET ALL MESSAGES (ADMIN) ================= */
exports.getAll = async () => {
  const result = await db.query(
    `SELECT id, name, email, phone, subject, message, created_at
     FROM contact_messages
     ORDER BY created_at DESC`
  );
  return result.rows;
};

/* ================= DELETE MESSAGE ================= */
exports.deleteById = async (id) => {
  await db.query(
    `DELETE FROM contact_messages WHERE id = $1`,
    [id]
  );
};
