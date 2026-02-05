import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewArrivals.css";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://ecommerce-website-trfk.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="new-arrivals">
      <div className="new-arrivals-container">
        <div className="section-header">
          <h2>New Arrivals</h2>
          <span className="view-all">View All</span>
        </div>

        <div className="product-grid">
          {products
            .slice()
            .reverse()
            .slice(0, 6)
            .map((product) => (
              <div
                className="product-card"
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="product-image">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/400x500?text=Product")
                    }
                  />

                  {product.sale_price && (
                    <span className="badge sale">Sale</span>
                  )}

                  {/* RIGHT ICONS */}
                  <div className="product-icons">
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
                  <div className="product-actions">
                    <button>Add To Wishlist</button>
                    <button>Buy Product</button>
                  </div>
                </div>

                <h3 className="product-title">{product.title}</h3>

                <div className="price">
                  {product.sale_price ? (
                    <>
                      <span className="old-price">${product.price}</span>
                      <span className="new-price">${product.sale_price}</span>
                    </>
                  ) : (
                    <span className="new-price">${product.price}</span>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
