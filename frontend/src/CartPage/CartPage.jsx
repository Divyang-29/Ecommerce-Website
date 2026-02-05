import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ---------- LOAD CART ---------- */
  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- OPTIMISTIC QTY UPDATE ---------- */
  const updateQty = async (id, newQty) => {
    if (newQty < 1) return;

    // instant UI update
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i)),
    );

    // backend update (no refetch)
    await fetch(`http://localhost:8080/api/cart/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity: newQty }),
    });
  };

  /* ---------- REMOVE ITEM ---------- */
  const removeItem = async (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));

    await fetch(`http://localhost:8080/api/cart/items/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (loading) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          {/* LEFT SKELETON */}
          <div className="cart-left">
            <h2>Shopping Cart</h2>

            {[1, 2, 3].map((i) => (
              <div className="cart-item skeleton" key={i}>
                <div className="cart-img-skeleton" />

                <div className="cart-info">
                  <div className="skeleton-line long" />
                  <div className="skeleton-line short" />
                  <div className="skeleton-line short" />
                </div>

                <div className="qty-skeleton" />
                <div className="price-skeleton" />
              </div>
            ))}
          </div>

          {/* RIGHT SUMMARY SKELETON */}
          <div className="cart-summary skeleton">
            <div className="skeleton-line long" />
            <div className="skeleton-line long" />
            <div className="skeleton-btn" />
            <div className="skeleton-btn outline" />
          </div>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/shop")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* LEFT */}
        <div className="cart-left">
          <h2>Shopping Cart</h2>

          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image_url} alt={item.title} />

              <div className="cart-info">
                <h4>{item.title}</h4>

                <p className="price">
                  {item.original_price && <del>${item.original_price}</del>} $
                  {item.price}
                </p>

                <p className="meta">
                  Size: {item.size || "—"} | Color: {item.color || "—"}
                </p>
              </div>

              <div className="cart-qty">
                <button onClick={() => updateQty(item.id, item.quantity - 1)}>
                  −
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQty(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>

              <div className="cart-price">
                <span>${(item.price * item.quantity).toFixed(2)}</span>

                <button
                  className="delete-btn"
                  onClick={() => removeItem(item.id)}
                  title="Remove item"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="cart-summary">
          <div className="summary-row">
            <span>{items.length} Items</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="summary-row total">
            <span>Total (tax incl.)</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>

          <p className="secure">Guarantee safe & secure checkout</p>

          <button className="continue-btn" onClick={() => navigate("/shop")}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
