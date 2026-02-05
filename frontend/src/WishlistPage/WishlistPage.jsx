import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WishlistPage.css";

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    if (!token) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setItems(data || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    await fetch(`http://localhost:8080/api/wishlist/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchWishlist();
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  /* 🔥 LOADING SKELETON */
  if (loading) {
    return (
      <div className="wishlist-page">
        <h2 className="wishlist-title">My Wishlist</h2>

        <div className="wishlist-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="wishlist-card skeleton">
              <div className="skeleton-img" />
              <div className="skeleton-text short" />
              <div className="skeleton-text long" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ✅ EMPTY STATE */
  if (items.length === 0) {
    return (
      <div className="empty-page">
        <h2>Your wishlist is empty</h2>
        <button onClick={() => navigate("/shop")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  /* ✅ NORMAL UI */
  return (
    <div className="wishlist-page">
      <h2 className="wishlist-title">My Wishlist</h2>

      <div className="wishlist-grid">
        {items.map((p) => (
          <div className="wishlist-card" key={p.id}>
            <button
              className="delete-btn"
              onClick={() => remove(p.id)}
            >
              🗑
            </button>

            <div className="wishlist-image">
              <img src={p.image_url} alt={p.title} />

              <div className="hover-icons">
                <button title="Add to Cart">🛒</button>
                <button
                  title="View"
                  onClick={() => navigate(`/product/${p.id}`)}
                >
                  👁
                </button>
              </div>

              <div
                className="buy-bar"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                Buy Product
              </div>
            </div>

            <h4>{p.title}</h4>

            <p className="price">
              {p.sale_price && <span className="old">${p.price}</span>}
              <span>${p.sale_price || p.price}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
