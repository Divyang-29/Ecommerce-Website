import "./DualPromo.css";
import { useNavigate } from "react-router-dom";

export default function DualPromo() {
  const navigate = useNavigate();
  return (
    <section className="dual-promo">
      <div className="container">
        <div className="promo-grid">
          {/* LEFT PROMO */}
          <div className="promo-card light">
            <div className="promo-text">
              <span className="promo-tag">New Collection</span>
              <h2>
                Up to 20% off <br /> jacket black
              </h2>
              <button onClick={() => navigate("/shop")}>Shop Now</button>
            </div>

            <img
              src="https://torado.envytheme.com/men-fashion-wear/default/assets/images/collection/collection1.jpg"
              alt="Jacket"
            />
          </div>

          {/* RIGHT PROMO */}
          <div className="promo-card light">
            <div className="promo-text">
              <span className="promo-tag">Latest Collection</span>
              <h2>
                Suit blazer sale <br /> up to 20% off
              </h2>
              <button onClick={() => navigate("/shop")}>Shop Now</button>
            </div>

            <img
              src="https://torado.envytheme.com/men-fashion-wear/default/assets/images/collection/collection2.jpg"
              alt="Suit"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
