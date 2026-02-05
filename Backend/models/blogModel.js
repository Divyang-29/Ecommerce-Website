const db = require("../config/db");

/* GET ALL */
exports.getAll = async () => {
  const result = await db.query(
    `SELECT id, title, slug, excerpt, image_url, author, created_at
     FROM blogs
     WHERE is_published = true
     ORDER BY created_at DESC`
  );
  return result.rows;
};

/* GET BY SLUG */
exports.getBySlug = async (slug) => {
  const result = await db.query(
    `SELECT *
     FROM blogs
     WHERE slug = $1 AND is_published = true`,
    [slug]
  );
  return result.rows[0];
};

/* SEARCH */
exports.search = async (q) => {
  const result = await db.query(
    `SELECT id, title, slug, excerpt, image_url
     FROM blogs
     WHERE title ILIKE $1 OR content ILIKE $1`,
    [`%${q}%`]
  );
  return result.rows;
};

/* ✅ CREATE BLOG */
exports.create = async ({
  title,
  slug,
  excerpt,
  content,
  image_url,
  author,
}) => {
  const result = await db.query(
    `INSERT INTO blogs
     (title, slug, excerpt, content, image_url, author, is_published)
     VALUES ($1,$2,$3,$4,$5,$6,true)
     RETURNING *`,
    [title, slug, excerpt, content, image_url, author]
  );

  return result.rows[0];
};
