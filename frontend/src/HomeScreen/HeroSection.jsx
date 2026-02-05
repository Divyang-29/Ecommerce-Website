import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import img1 from "./../assets/img1.png";
import img2 from "./../assets/img2.png";
import img3 from "./../assets/img3.png";
const slides = [
  {
    id: 1,
    title: "Blazer Collections",
    image: img1,
  },
  {
    id: 2,
    title: "Denim Collections",
    image: img2,
  },
  {
    id: 3,
    title: "Polo T-Shirt Collections",
    image: img3,
  },
  {
    id: 4,
    title: "Winter Collections",
    image:
      "https://trueanalyse.com/wp-content/uploads/2021/05/trueanalyse_intro.png",
  },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  return (
    <section className="hero">
      {/* LEFT TEXT */}
      <div className="hero-left">
        <span className="trend">Trending 2025</span>
        <h1>
          Summer <br />
          Exclusive Men&apos;s <br />
          Fashion
        </h1>
        <button className="shop-btn" onClick={()=>navigate("/shop")}>Shop Now</button>
      </div>

      {/* SLIDER */}
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${active === index ? "active" : ""}`}
            onClick={() => setActive(index)}
          >
            {/* Vertical Label */}
            {active !== index && (
              <div className="slide-label">
                <span>{slide.title}</span>
              </div>
            )}

            {/* Image */}
            <div className="slide-content">
              <img src={slide.image} alt={slide.title} />
              <div className="overlay">
                <h3>{slide.title}</h3>
                <span>View All</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
