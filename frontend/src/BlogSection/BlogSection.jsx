import { useEffect, useState } from "react";
import "./BlogSection.css";

export default function BlogSection({ limit }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        // ✅ LIMIT ONLY IF PROVIDED
        setBlogs(limit ? data.slice(0, limit) : data);
      })
      .catch((err) => console.error(err));
  }, [limit]);

  return (
    <section className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <h2>Our Blog</h2>

          {/* ✅ Show View All ONLY on home */}
          {limit && (
            <a href="/blogs" className="view-all">
              View All
            </a>
          )}
        </div>

        <div className="blog-grid">
          {blogs.map((blog) => (
            <div className="blog-card" key={blog.id}>
              <img src={blog.image_url} alt={blog.title} />

              <div className="blog-meta">
                By: {blog.author} |{" "}
                {new Date(blog.created_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>

              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>

              <a href={`/blogs/${blog.slug}`} className="read-more">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
