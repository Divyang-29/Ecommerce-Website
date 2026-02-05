const db = require("../config/db");

const TestimonialModel = {
  create: async ({ name, designation, review_text, image_url }) => {
    const query = `
      INSERT INTO testimonials (name, designation, review_text, image_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, designation, review_text, image_url];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  findAllActive: async () => {
    const query = `
      SELECT id, name, designation, review_text, image_url
      FROM testimonials
      WHERE is_active = true
      ORDER BY created_at DESC;
    `;
    const { rows } = await db.query(query);
    return rows;
  },

  updateStatus: async (id, is_active) => {
    const query = `
      UPDATE testimonials
      SET is_active = $1
      WHERE id = $2
      RETURNING *;
    `;
    const { rows } = await db.query(query, [is_active, id]);
    return rows[0];
  },

  delete: async (id) => {
    await db.query("DELETE FROM testimonials WHERE id = $1", [id]);
    return true;
  }
};

module.exports = TestimonialModel;
