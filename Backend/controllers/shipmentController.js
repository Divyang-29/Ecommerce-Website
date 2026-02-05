const db = require("../config/db");

const trackOrder = async (req, res) => {
  const { trackingId } = req.params;

  const order = await db.query(
    `SELECT id, shipment_status, created_at
     FROM orders
     WHERE tracking_id = $1`,
    [trackingId]
  );

  if (!order.rows.length) {
    return res.status(404).json({ message: "Invalid tracking ID" });
  }

  const history = await db.query(
    `SELECT status, description, created_at
     FROM shipment_tracking
     WHERE order_id = $1
     ORDER BY created_at`,
    [order.rows[0].id]
  );

  res.json({
    tracking_id: trackingId,
    current_status: order.rows[0].shipment_status,
    history: history.rows,
  });
};

module.exports = {
  trackOrder,
};
