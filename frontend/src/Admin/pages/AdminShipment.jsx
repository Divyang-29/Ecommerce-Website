import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./AdminShipment.css";

export default function AdminShipment() {
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("order_placed");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ================= FETCH ORDERS ================= */
  useEffect(() => {
    fetch("http://localhost:8080/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setOrders)
      .catch(console.error);
  }, [token]);

  /* ================= UPDATE SHIPMENT ================= */
  const updateShipment = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!orderId) {
      setMessage("Please select an order");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/shipment/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
            description,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to update shipment");
      } else {
        setMessage(`✅ Shipment updated to "${status}"`);
        setDescription("");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title="Shipment Management"
        subtitle="Update order shipment status"
      />

      <form className="admin-form" onSubmit={updateShipment}>
        {/* ORDER SELECT */}
        <select
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
        >
          <option value="">Select Order</option>
          {orders.map((o) => (
            <option key={o.id} value={o.id}>
              #{o.id} — {o.tracking_id} ({o.shipment_status})
            </option>
          ))}
        </select>

        {/* STATUS */}
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="order_placed">Order Placed</option>
          <option value="packed">Packed</option>
          <option value="shipped">Shipped</option>
          <option value="out_for_delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Updating..." : "Update Shipment"}
        </button>

        {message && <p className="status-msg">{message}</p>}
      </form>
    </>
  );
}
