import { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import "./FAQs.css";

export default function FAQs() {
  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [faqs, setFaqs] = useState([]);

  const [form, setForm] = useState({
    question: "",
    answer: "",
  });

  /* ===== LOAD FAQ CATEGORIES ===== */
  useEffect(() => {
    fetch("http://localhost:8080/api/faq-categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  /* ===== LOAD FAQS FOR SELECTED CATEGORY ===== */
  useEffect(() => {
    if (!selectedCategory) {
      setFaqs([]);
      return;
    }

    fetch(`http://localhost:8080/api/faqs/${selectedCategory}`)
      .then((res) => res.json())
      .then(setFaqs)
      .catch(console.error);
  }, [selectedCategory]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ===== ADD FAQ (STRICT CATEGORY) ===== */
  const addFaq = async (e) => {
    e.preventDefault();

    if (!selectedCategory) {
      alert("Please select a FAQ category first");
      return;
    }

    await fetch("http://localhost:8080/api/faqs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question: form.question,
        answer: form.answer,
        category_id: selectedCategory, // ✅ STRICT
      }),
    });

    setForm({ question: "", answer: "" });

    // reload only this category
    fetch(`http://localhost:8080/api/faqs/${selectedCategory}`)
      .then((res) => res.json())
      .then(setFaqs);
  };

  return (
    <>
      <Header title="FAQs" subtitle="Add FAQs into specific categories" />

      {/* ===== CATEGORY SELECT ===== */}
      <div className="admin-form">
        <h3>Select FAQ Category</h3>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
        >
          <option value="">-- Select Category --</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      {/* ===== ADD FAQ FORM ===== */}
      {selectedCategory && (
        <form className="admin-form" onSubmit={addFaq}>
          <h3>Add FAQ to Selected Category</h3>

          <input
            name="question"
            placeholder="Question"
            value={form.question}
            onChange={handleChange}
            required
          />

          <textarea
            name="answer"
            placeholder="Answer"
            value={form.answer}
            onChange={handleChange}
            required
          />

          <button type="submit">Add FAQ</button>
        </form>
      )}

      {/* ===== FAQ LIST ===== */}
      {selectedCategory && (
        <Table
          columns={[
            { key: "question", label: "Question" },
            { key: "answer", label: "Answer" },
          ]}
          data={faqs}
        />
      )}
    </>
  );
}
