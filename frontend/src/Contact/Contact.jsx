import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("https://ecommerce-website-trfk.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess("Message sent successfully");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-wrapper">
          {/* LEFT FORM */}
          <div className="contact-form">
            <h2>Ask a question</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
              />

              <input
                type="text"
                name="subject"
                placeholder="Your subject"
                value={form.subject}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Write your message"
                rows="5"
                value={form.message}
                onChange={handleChange}
              />

              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}

              <button disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* RIGHT INFO */}
          <div className="contact-info">
            <h4>Address</h4>
            <p>📍 2750 Quadra Street, Victoria, Canada</p>

            <h4>Phone</h4>
            <p>📞 (+123) 456-7898</p>

            <h4>Email</h4>
            <p>✉️ support@torado.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
