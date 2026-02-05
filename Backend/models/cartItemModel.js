const db = require("../config/db");

exports.addItem = async (data) => {
  const result = await db.query(
    `INSERT INTO cart_items
     (cart_id, product_id, size, color, quantity, price)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      data.cart_id,
      data.product_id,
      data.size,
      data.color,
      data.quantity,
      data.price,
    ]
  );

  return result.rows[0];
};

exports.updateQuantity = async (id, quantity) => {
  await db.query(
    "UPDATE cart_items SET quantity = $1 WHERE id = $2",
    [quantity, id]
  );
};

exports.deleteItem = async (id) => {
  await db.query("DELETE FROM cart_items WHERE id = $1", [id]);
};
