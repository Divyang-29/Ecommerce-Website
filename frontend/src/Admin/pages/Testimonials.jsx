import { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import "./Testimonials.css";

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    review_text: "",
    image_url: "",
  });

  const token = localStorage.getItem("token");

  const loadTestimonials = async () => {
    const res = await fetch("http://localhost:8080/api/testimonials");
    setItems(await res.json());
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTestimonial = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8080/api/testimonials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setForm({
      name: "",
      designation: "",
      review_text: "",
      image_url: "",
    });

    loadTestimonials();
  };

  return (
    <>
      <Header title="Testimonials" subtitle="Manage customer testimonials" />

      {/* ===== ADD TESTIMONIAL FORM ===== */}
      <form className="admin-form" onSubmit={addTestimonial}>
        <h3>Add Testimonial</h3>

        <input
          name="name"
          placeholder="Customer Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="designation"
          placeholder="Designation (e.g. Product Manager)"
          value={form.designation}
          onChange={handleChange}
          required
        />

        <input
          name="image_url"
          placeholder="Profile Image URL"
          value={form.image_url}
          onChange={handleChange}
        />

        <textarea
          name="review_text"
          placeholder="Customer Review"
          value={form.review_text}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Testimonial</button>
      </form>

      {/* ===== TESTIMONIAL LIST ===== */}
      <Table
        columns={[
          { key: "name", label: "Name" },
          { key: "designation", label: "Designation" },
          { key: "review_text", label: "Review" },
        ]}
        data={items}
      />
    </>
  );
}
