import { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import "./Blogs.css";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
    author: "",
  });

  const token = localStorage.getItem("token");

  const loadBlogs = async () => {
    const res = await fetch("https://ecommerce-website-trfk.onrender.com/api/blogs");
    setBlogs(await res.json());
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addBlog = async (e) => {
    e.preventDefault();

    await fetch("https://ecommerce-website-trfk.onrender.com/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setForm({
      title: "",
      excerpt: "",
      content: "",
      image_url: "",
      author: "",
    });

    loadBlogs();
  };

  return (
    <>
      <Header title="Blogs" subtitle="Manage blog posts" />

      {/* ===== ADD BLOG FORM ===== */}
      <form className="admin-form" onSubmit={addBlog}>
        <h3>Add Blog</h3>

        <input
          name="title"
          placeholder="Blog Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />

        <input
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleChange}
          required
        />

        <textarea
          name="excerpt"
          placeholder="Short Excerpt"
          value={form.excerpt}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Full Blog Content"
          value={form.content}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Blog</button>
      </form>

      {/* ===== BLOG LIST ===== */}
      <Table
        columns={[
          { key: "title", label: "Title" },
          { key: "author", label: "Author" },
        ]}
        data={blogs}
      />
    </>
  );
}
