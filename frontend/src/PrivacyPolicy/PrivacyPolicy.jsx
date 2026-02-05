import { useEffect, useState } from "react";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/privacy")
      .then((res) => res.json())
      .then((data) => setSections(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="privacy-page">
      <div className="privacy-container">
        {sections.map((item) => (
          <div className="privacy-block" key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
