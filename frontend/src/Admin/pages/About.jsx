import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./About.css";

export default function About() {
  const [sections, setSections] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "", // ✅ FIXED
  });

  const token = localStorage.getItem("token");

  const loadSections = async () => {
    const res = await fetch("https://ecommerce-website-trfk.onrender.com/api/about");
    setSections(await res.json());
  };

  useEffect(() => {
    loadSections();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSection = async (e) => {
    e.preventDefault();

    const res = await fetch("https://ecommerce-website-trfk.onrender.com/api/about", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Failed to add section");
      return;
    }

    setForm({ title: "", description: "" });
    loadSections();
  };

  return (
    <>
      <Header title="About Page" subtitle="Manage About sections" />

      {/* ===== ADD ABOUT SECTION FORM ===== */}
      <form className="admin-form" onSubmit={addSection}>
        <h3>Add About Section</h3>

        <input
          name="title"
          placeholder="Section Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Section Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Section</button>
      </form>

      {/* ===== ABOUT SECTIONS LIST ===== */}
      <div className="about-list">
        {sections.map((s) => (
          <div key={s.id} className="about-card">
            <h4>{s.title}</h4>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}