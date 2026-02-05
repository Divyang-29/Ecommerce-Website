import { useEffect, useState } from "react";
import FeaturedCategories from "../Features/FeaturedCategories";
import TestimonialSlider from "../Testimonial/TestimonialSlider";
import "./AboutUs.css";

export default function AboutUs() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/about")
      .then((res) => res.json())
      .then(setSections)
      .catch(console.error);
  }, []);

  return (
    <section className="about">
      <div className="about-container">
        {/* HEADING */}
        <div className="about-header">
          <h2>
            A World Class Shop For Anyone, Anywhere,
            <br />
            Wonderful Choice
          </h2>
        </div>

        {/* HERO IMAGE */}
        <div className="about-hero">
          <div className="video-wrapper">
            <img
              src="https://torado.envytheme.com/men-fashion-wear/default/assets/images/about-us.jpg"
              alt="About us"
            />
            <button className="play-btn">▶</button>
          </div>
        </div>

        {/* DYNAMIC ABOUT SECTIONS */}
        <div className="about-sections">
          {sections.map((item) => (
            <div key={item.id} className="about-row">
              <div className="about-left">
                <span className="arrow">➜</span>
                <h4>{item.title}</h4>
              </div>

              <div className="about-right">
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* STATS */}
        <div className="about-stats">
          <div className="stat">
            <h3>251K</h3>
            <span>Products</span>
          </div>
          <div className="stat">
            <h3>1521+</h3>
            <span>Clients Feedback</span>
          </div>
          <div className="stat">
            <h3>172+</h3>
            <span>Hard Workers</span>
          </div>
          <div className="stat">
            <h3>553+</h3>
            <span>Brands</span>
          </div>
        </div>
      </div>

      <TestimonialSlider />
      <FeaturedCategories />
    </section>
  );
}
