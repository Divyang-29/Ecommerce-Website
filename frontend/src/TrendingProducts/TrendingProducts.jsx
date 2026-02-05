import { useEffect, useState } from "react";
import "./TrendingProducts.css";

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/trending")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Trending API did not return array:", data);
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
      });
  }, []);

  return (
    <section className="trending-products">
      <div className="trending-container">
        <div className="trending-header">
          <h2>Trending Products</h2>

          <div className="trending-nav">
            <button>‹</button>
            <button>›</button>
          </div>
        </div>

        <div className="trending-grid">
          {products.map((product) => (
            <div className="trending-card" key={product.id}>
              <div className="trending-image">
                <img
                  src={product.image_url}
                  alt={product.title}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/400x500?text=Product")
                  }
                />

                {/* RIGHT ICONS */}
                <div className="trending-icons">
                  <button title="Add to Cart">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                  <button title="Quick View">
                    <i className="fa-regular fa-eye"></i>
                  </button>
                  <button title="Compare">
                    <i className="fa-solid fa-code-compare"></i>
                  </button>
                </div>

                {/* BOTTOM ACTIONS */}
                <div className="trending-actions">
                  <button>Add To Wishlist</button>
                  <button>Buy Product</button>
                </div>
              </div>

              <div className="trending-title">{product.title}</div>

              <div className="trending-price">
                {product.sale_price ? (
                  <>
                    <span className="old">${product.price}</span>
                    <span className="new">${product.sale_price}</span>
                  </>
                ) : (
                  <span className="new">${product.price}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
