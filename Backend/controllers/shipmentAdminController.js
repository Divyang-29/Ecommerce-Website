const db = require("../config/db");

const allowedStatuses = [
  "order_placed",
  "packed",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

const updateShipmentStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status, description } = req.body;

  if (!allowedStatuses.includes(status)) { 
    return res.status(400).json({ message: "Invalid shipment status" });
  }

  const order = await db.query(
    "SELECT id FROM orders WHERE id = $1",
    [orderId]
  );

  if (!order.rows.length) {
    return res.status(404).json({ message: "Order not found" });
  }

  await db.query(
    "UPDATE orders SET shipment_status = $1 WHERE id = $2",
    [status, orderId]
  );

  await db.query(
    `INSERT INTO shipment_tracking (order_id, status, description)
     VALUES ($1, $2, $3)`,
    [
      orderId,
      status,
      description || `Order status updated to ${status}`,
    ]
  );

  res.json({
    message: "Shipment status updated successfully",
    status,
  });
};

module.exports = {
  updateShipmentStatus,
};
