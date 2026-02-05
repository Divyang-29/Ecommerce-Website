import "./Features.css";

export default function Features() {
  return (
    <section className="features">
      <div className="feature-item">
        <div className="icon">
          <i className="fa-solid fa-truck"></i>
        </div>
        <p>Free Worldwide Shipping</p>
      </div>

      <div className="feature-item">
        <div className="icon">
          <i className="fa-regular fa-comments"></i>
        </div>
        <p>Best Online Support</p>
      </div>

      <div className="feature-item">
        <div className="icon">
          <i className="fa-regular fa-credit-card"></i>
        </div>
        <p>Secured Online Payment</p>
      </div>
    </section>
  );
}
