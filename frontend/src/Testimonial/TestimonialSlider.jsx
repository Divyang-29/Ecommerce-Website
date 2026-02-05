import { useEffect, useState } from "react";
import "./TestimonialSlider.css";

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/testimonials")
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error(err));
  }, []);

  if (!testimonials.length) return null;

  const prevSlide = () => {
    setCurrent(prev =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent(prev =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const { name, designation, review_text, image_url } =
    testimonials[current];

  return (
    <section className="testimonial-section">
      <h2>Our Customer Review</h2>

      <div className="testimonial-box">
        <button className="nav left" onClick={prevSlide}>
          ‹
        </button>

        <div className="content">
          <p className="review">“{review_text}”</p>

          <div className="user">
            <img src={image_url} alt={name} />
            <div>
              <h4>{name}</h4>
              <span>{designation}</span>
            </div>
          </div>
        </div>

        <button className="nav right" onClick={nextSlide}>
          ›
        </button>
      </div>
    </section>
  );
}
