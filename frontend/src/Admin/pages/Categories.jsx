import { useEffect, useState } from "react";
import "./Categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");

  const load = async () => {
    const res = await fetch("http://localhost:8080/api/categories");
    setCategories(await res.json());
  };

  const add = async () => {
    if (!name.trim()) return;

    await fetch("http://localhost:8080/api/categories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setName("");
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="categories-page">
      <h1>Categories</h1>

      <div className="category-form">
        <input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={add}>Add</button>
      </div>

      {/* ✅ GRID VIEW */}
      <div className="category-grid">
        {categories.map((c) => (
          <div key={c.id} className="category-card">
            {c.name}
          </div>
        ))}
      </div>
    </div>
  );
}
