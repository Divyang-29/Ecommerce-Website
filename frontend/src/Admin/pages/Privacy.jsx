import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./Privacy.css";

export default function Privacy() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const token = localStorage.getItem("token");

  const loadItems = async () => {
    const res = await fetch("https://ecommerce-website-trfk.onrender.com/api/privacy");
    setItems(await res.json());
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addItem = async (e) => {
    e.preventDefault();

    await fetch("https://ecommerce-website-trfk.onrender.com/api/privacy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setForm({ title: "", content: "" });
    loadItems();
  };

  return (
    <>
      <Header title="Privacy Policy" subtitle="Manage privacy policy content" />

      {/* ===== ADD PRIVACY SECTION FORM ===== */}
      <form className="admin-form" onSubmit={addItem}>
        <h3>Add Privacy Section</h3>

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

      {/* ===== PRIVACY LIST ===== */}
      <div className="privacy-list">
        {items.map((p) => (
          <div key={p.id} className="privacy-card">
            <h4>{p.title}</h4>
            <p>{p.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}
