const db = require("../config/db");

exports.createOrder = async (data) => {
  const result = await db.query(
    `INSERT INTO orders
     (user_id, cart_id, total, payment_method, tracking_id)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [
      data.user_id,
      data.cart_id,
      data.total,
      data.payment_method,
      data.tracking_id,
    ]
  );

  return result.rows[0];
};
