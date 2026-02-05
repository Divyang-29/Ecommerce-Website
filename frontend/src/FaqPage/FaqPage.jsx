import { useEffect, useState } from "react";
import "./FaqPage.css";

export default function FaqPage() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  /* FETCH CATEGORIES */
  useEffect(() => {
    fetch("http://localhost:8080/api/faq-categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data.length) setActiveCategory(data[0]);
      })
      .catch(console.error);
  }, []);

  /* FETCH FAQS */
  useEffect(() => {
    if (!activeCategory) return;

    fetch(`http://localhost:8080/api/faqs/${activeCategory.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data);
        setOpenIndex(0);
      })
      .catch(console.error);
  }, [activeCategory]);

  return (
    <section className="faq-page">
      <div className="faq-container">
        {/* CATEGORY CARDS */}
        <div className="faq-categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`faq-category ${
                activeCategory?.id === cat.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              <span
                className="icon"
                dangerouslySetInnerHTML={{
                  __html:
                    cat.icon || '<i class="fa-solid fa-circle-question"></i>',
                }}
              />
              <span className="title">{cat.title}</span>
            </button>
          ))}
        </div>

        {/* FAQ LIST */}
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`faq-item ${openIndex === index ? "open" : ""}`}
            >
              <div
                className="faq-question"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <span>{faq.question}</span>
                <span className="arrow">
                  {openIndex === index ? "▲" : "▼"}
                </span>
              </div>

              {openIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
