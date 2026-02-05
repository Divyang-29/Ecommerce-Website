import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchDrawer.css";

export default function SearchDrawer({ onClose }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  /* FETCH ALL PRODUCTS ONCE */
  useEffect(() => {
    fetch("https://ecommerce-website-trfk.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  /* FILTER PRODUCTS */
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();

    const filtered = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category_name?.toLowerCase().includes(q)
    );

    setResults(filtered.slice(0, 8)); // limit results
  }, [query, products]);

  return (
    <div className="search-overlay">
      <div className="search-box">
        {/* HEADER */}
        <div className="search-header">
          <input
            type="text"
            placeholder="Search here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button onClick={onClose}>✕</button>
        </div>

        {/* RESULTS */}
        {results.length > 0 && (
          <>
            <div className="search-meta">
              <span>{results.length} Results</span>
              <span
                className="view-all"
                onClick={() =>
                  navigate(`/shop?search=${query}`)
                }
              >
                View All
              </span>
            </div>

            <div className="search-grid">
              {results.map((p) => (
                <div
                  key={p.id}
                  className="search-card"
                  onClick={() => navigate(`/product/${p.id}`)}
                >
                  <img src={p.image_url} alt={p.title} />
                  <h4>{p.title}</h4>
                  <span>${p.price}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* EMPTY STATE */}
        {query && results.length === 0 && (
          <p className="no-results">No products found</p>
        )}
      </div>
    </div>
  );
}
