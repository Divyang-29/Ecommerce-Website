const db = require("../config/db");

/* ================= FIND USER BY EMAIL ================= */
exports.findByEmail = async (email) => {
  const result = await db.query(
    "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
    [email.trim()]
  );
  return result.rows[0];
};

/* ================= CREATE USER ================= */
exports.createUser = async ({
  first_name,
  last_name,
  email,
  password,
  role,
}) => {
  const result = await db.query(
    `INSERT INTO users (first_name, last_name, email, password, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, first_name, last_name, email, role`,
    [first_name, last_name, email, password, role]
  );

  return result.rows[0];
};
