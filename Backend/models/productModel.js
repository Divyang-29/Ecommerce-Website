const db = require("../config/db");

/* ================= CREATE PRODUCT ================= */
exports.createProduct = async (data) => {
  const result = await db.query(
    `INSERT INTO products
     (category_id, title, description, price, sale_price, sku, expected_delivery)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      data.category_id,
      data.title,
      data.description,
      data.price,
      data.sale_price,
      data.sku,
      data.expected_delivery,
    ],
  );

  return result.rows[0];
};

/* ================= GET ALL PRODUCTS ================= */
exports.getAllProducts = async () => {
  const result = await db.query(`
    SELECT 
      p.id,
      p.category_id,
      p.title,
      p.description,
      p.price,
      p.sale_price,
      p.sku,
      p.expected_delivery,
      p.created_at,
      c.name AS category_name,
      pi.image_url
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN product_images pi 
      ON pi.product_id = p.id 
     AND pi.is_primary = true
    ORDER BY p.created_at DESC
  `);

  return result.rows;
};

/* ================= GET PRODUCT BY ID ================= */
exports.getProductById = async (id) => {
  const result = await db.query(`SELECT * FROM products WHERE id = $1`, [id]);
  return result.rows[0];
};

/* ================= PRODUCT IMAGES ================= */
exports.addImage = async (productId, image) => {
  await db.query(
    `INSERT INTO product_images (product_id, image_url, is_primary)
     VALUES ($1, $2, $3)`,
    [productId, image.image_url, image.is_primary],
  );
};

exports.getImages = async (productId) => {
  const result = await db.query(
    `SELECT image_url, is_primary
     FROM product_images
     WHERE product_id = $1`,
    [productId],
  );
  return result.rows;
};

/* ================= PRODUCT SIZES ================= */
exports.addSize = async (productId, size, stock) => {
  await db.query(
    `INSERT INTO product_sizes (product_id, size, stock)
     VALUES ($1, $2, $3)
     ON CONFLICT (product_id, size)
     DO UPDATE SET stock = EXCLUDED.stock`,
    [productId, size, stock],
  );
};

exports.getSizes = async (productId) => {
  const result = await db.query(
    `SELECT size, stock
     FROM product_sizes
     WHERE product_id = $1
     ORDER BY
       CASE
         WHEN size = 'XS' THEN 1
         WHEN size = 'S' THEN 2
         WHEN size = 'M' THEN 3
         WHEN size = 'L' THEN 4
         WHEN size = 'XL' THEN 5
         WHEN size = 'XXL' THEN 6
         ELSE 7
       END`,
    [productId],
  );
  return result.rows;
};

/* ================= PRODUCT COLORS ================= */
exports.addColor = async (productId, color) => {
  await db.query(
    `INSERT INTO product_colors (product_id, color_name)
     VALUES ($1, $2)
     ON CONFLICT (product_id, color_name) DO NOTHING`,
    [productId, color],
  );
};

exports.getColors = async (productId) => {
  const result = await db.query(
    `SELECT color_name FROM product_colors WHERE product_id = $1`,
    [productId],
  );
  return result.rows;
};
