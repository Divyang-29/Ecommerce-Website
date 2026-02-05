import { useState } from "react";
import "./TrackOrderPage.css";

export default function TrackOrderPage() {
  const [trackingId, setTrackingId] = useState("");
  const [email, setEmail] = useState(""); // optional (UI only)
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const trackOrder = async () => {
    if (!trackingId) {
      setError("Please enter Order ID");
      return;
    }

    setError("");
    setLoading(true);
    setData(null);

    try {
      const res = await fetch(
        `http://localhost:8080/api/shipment/track/${trackingId}`,
      );

      if (!res.ok) {
        throw new Error("Invalid Order ID");
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-page">
      <div className="track-box">
        <h2>
          <span className="line"></span>
          All In One Package Tracking
        </h2>

        {/* INPUTS */}
        <label>Order ID</label>
        <input
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter tracking ID"
        />

        <label>Billing email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional)"
        />

        <button onClick={trackOrder} disabled={loading}>
          {loading ? "Tracking..." : "Track Order"}
        </button>

        {/* ERROR */}
        {error && <p className="error">{error}</p>}

        {/* RESULT */}
        {data && (
          <div className="tracking-result">
            <h3>Tracking ID: {data.tracking_id}</h3>
            <p className="status">
              Current Status:{" "}
              <strong>{formatStatus(data.current_status)}</strong>
            </p>

            <div className="timeline">
              {data.history.map((h, index) => (
                <div className="timeline-item" key={index}>
                  <span className="dot"></span>
                  <div>
                    <p className="title">{formatStatus(h.status)}</p>
                    <p className="desc">{h.description}</p>
                    <span className="date">
                      {new Date(h.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatStatus(status) {
  return status.replace(/_/g, " ").toUpperCase();
}
