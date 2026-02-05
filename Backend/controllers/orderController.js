const Order = require("../models/orderModel");
const db = require("../config/db");
const { generateTrackingId } = require("../utils/trackingId");

exports.checkout = async (req, res) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const trackingId = generateTrackingId();

    const orderRes = await client.query(
      `INSERT INTO orders
       (user_id, cart_id, total, payment_method, tracking_id, shipment_status)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [
        req.user.id,
        req.body.cart_id,
        req.body.total,
        req.body.payment_method,
        trackingId,
        "order_placed",
      ],
    );

    const order = orderRes.rows[0];

    await client.query(`INSERT INTO order_addresses (...) VALUES (...)`);

    await client.query(
      `INSERT INTO shipment_tracking (order_id, status, description)
       VALUES ($1,$2,$3)`,
      [order.id, "order_placed", "Order placed successfully"],
    );

    await client.query(`UPDATE carts SET status='checked_out' WHERE id=$1`, [
      req.body.cart_id,
    ]);

    await client.query("COMMIT");

    res.json({
      message: "Order placed successfully",
      order_id: order.id,
      tracking_id: trackingId,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ message: "Checkout failed" });
  } finally {
    client.release();
  }
};

// controllers/orderController.js
exports.getAllOrders = async (req, res) => {
  const result = await db.query(`
    SELECT id, tracking_id, shipment_status, created_at
    FROM orders
    ORDER BY created_at DESC
  `);

  res.json(result.rows);
};
