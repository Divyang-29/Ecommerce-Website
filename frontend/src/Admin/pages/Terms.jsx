import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./Terms.css";

export default function Terms() {
  const [terms, setTerms] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const token = localStorage.getItem("token");

  const loadTerms = async () => {
    const res = await fetch("http://localhost:8080/api/terms");
    setTerms(await res.json());
  };

  useEffect(() => {
    loadTerms();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTerm = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8080/api/terms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setForm({ title: "", content: "" });
    loadTerms();
  };

  return (
    <>
      <Header
        title="Terms & Conditions"
        subtitle="Manage terms and conditions content"
      />

      {/* ===== ADD TERMS FORM ===== */}
      <form className="admin-form" onSubmit={addTerm}>
        <h3>Add Terms Section</h3>

        <input
          name="title"
          placeholder="Section Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Section Content"
          value={form.content}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Section</button>
      </form>

      {/* ===== TERMS LIST ===== */}
      <div className="terms-list">
        {terms.map((t) => (
          <div key={t.id} className="terms-card">
            <h4>{t.title}</h4>
            <p>{t.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}
