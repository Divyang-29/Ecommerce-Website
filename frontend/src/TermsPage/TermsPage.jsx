import { useEffect, useState } from "react";
import "./TermsPage.css";

export default function TermsPage() {
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/terms")
      .then((res) => res.json())
      .then((data) => setTerms(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="terms-page">
      <div className="terms-container">
        {terms.map((term) => (
          <div className="terms-block" key={term.id}>
            <h3>{term.title}</h3>
            <p>{term.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
