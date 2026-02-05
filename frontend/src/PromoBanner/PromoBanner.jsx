import "./PromoBanner.css";
import { useNavigate } from "react-router-dom";
export default function PromoBanner() {
  const navigate = useNavigate();
  return (
    <section className="promo-section">
      <div className="promo-banner">
        <div className="promo-overlay">
          <div className="promo-content">
            <h1>
              Summer sale up <br /> to <span>50% OFF</span>
            </h1>
            <p>The latest collections of men&apos;s fashion.</p>
            <button className="promo-btn" onClick={()=>navigate("/shop")}>Shop Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
