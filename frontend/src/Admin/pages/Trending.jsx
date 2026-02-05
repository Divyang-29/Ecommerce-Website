import { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import "./Trending.css";

export default function Trending() {
  const [trending, setTrending] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  const token = localStorage.getItem("token");

  /* ===== LOAD TRENDING ===== */
  const loadTrending = async () => {
    const res = await fetch("https://ecommerce-website-trfk.onrender.com/api/trending");
    setTrending(await res.json());
  };

  /* ===== LOAD PRODUCTS ===== */
  const loadProducts = async () => {
    const res = await fetch("https://ecommerce-website-trfk.onrender.com/api/products");
    setProducts(await res.json());
  };

  useEffect(() => {
    loadTrending();
    loadProducts();
  }, []);

  /* ===== ADD TO TRENDING ===== */
  const addTrending = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    await fetch(
      `https://ecommerce-website-trfk.onrender.com/api/trending/${selectedProduct}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSelectedProduct("");
    loadTrending();
  };

  return (
    <div className="trending-page">
      <Header title="Trending Products" subtitle="Manage trending products" />

      {/* ===== ADD FORM ===== */}
      <form className="admin-form" onSubmit={addTrending}>
        <h3>Add Trending Product</h3>

        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          required
        >
          <option value="">Select product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>

        <button type="submit">Add to Trending</button>
      </form>

      {/* ===== LIST ===== */}
      <Table
        columns={[
          { key: "title", label: "Product" },
          { key: "price", label: "Price" },
        ]}
        data={trending}
      />
    </div>
  );
}
