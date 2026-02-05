import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Filters from "./Filters";
import "./ShopPage.css";
import ShopSkeleton from "../ShopSkeleton/ShopSkeleton";

/* ---------- HELPERS ---------- */
const getEffectivePrice = (product) => {
  const sale = Number(product.sale_price);
  if (!Number.isNaN(sale) && sale > 0) return sale;
  const price = Number(product.price);
  return Number.isNaN(price) ? 0 : price;
};

/* ---------- COMPONENT ---------- */
export default function ShopPage() {
  const navigate = useNavigate();
  const { categorySlug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [priceBounds, setPriceBounds] = useState([0, 0]);

  const [filters, setFilters] = useState({
    category: "All",
    inStock: null,
    price: [0, 0],
    color: null,
    size: null,
  });

  /* ---------- FETCH PRODUCTS ---------- */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("https://ecommerce-website-trfk.onrender.com/api/products");
        const data = await res.json();

        const detailed = await Promise.all(
          data.map(async (p) => {
            const r = await fetch(`https://ecommerce-website-trfk.onrender.com/api/products/${p.id}`);
            const d = await r.json();

            const totalStock = (d.sizes || []).reduce(
              (s, x) => s + (Number(x.stock) || 0),
              0,
            );

            return {
              ...p,
              sizes: d.sizes || [],
              colors: d.colors || [],
              inStock: totalStock > 0,
            };
          }),
        );

        setProducts(detailed);

        const prices = detailed.map(getEffectivePrice);
        const min = Math.min(...prices);
        const max = Math.max(...prices);

        setPriceBounds([min, max]);
        setFilters((f) => ({ ...f, price: [min, max] }));
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  /* ---------- APPLY CATEGORY FROM URL ---------- */
  useEffect(() => {
    if (!categorySlug || products.length === 0) return;

    const categoryMap = new Map();

    products.forEach((p) => {
      if (p.category_slug && p.category_name) {
        categoryMap.set(p.category_slug, p.category_name);
      } else if (p.category_name) {
        const slug = p.category_name.toLowerCase().replace(/\s+/g, "-");
        categoryMap.set(slug, p.category_name);
      }
    });

    const matchedCategory = categoryMap.get(categorySlug);

    if (matchedCategory) {
      setFilters((f) => ({
        ...f,
        category: matchedCategory,
      }));
    }
  }, [categorySlug, products]);

  /* ---------- CATEGORIES FOR FILTER SIDEBAR ---------- */
  const categories = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      const name = p.category_name || "Uncategorized";
      map.set(name, (map.get(name) || 0) + 1);
    });
    return Array.from(map.entries());
  }, [products]);

  /* ---------- FILTERED PRODUCTS ---------- */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const price = getEffectivePrice(p);

      if (filters.category !== "All") {
        if (p.category_name !== filters.category) return false;
      }

      if (filters.inStock === true && !p.inStock) return false;
      if (filters.inStock === false && p.inStock) return false;

      if (price < filters.price[0] || price > filters.price[1]) return false;

      if (filters.size) {
        const sizes = p.sizes.map((s) => s.size);
        if (!sizes.includes(filters.size)) return false;
      }

      return true;
    });
  }, [products, filters]);

  if (loading) {
    return (
      <section className="shop-page">
        <div className="shop-container">
          <aside className="shop-sidebar">
            <Filters
              filters={filters}
              setFilters={setFilters}
              priceBounds={priceBounds}
              categories={[]}
            />
          </aside>

          <main className="shop-content">
            <ShopSkeleton count={8} />
          </main>
        </div>
      </section>
    );
  }

  return (
    <section className="shop-page">
      <div className="shop-container">
        <aside className="shop-sidebar">
          <Filters
            filters={filters}
            setFilters={setFilters}
            priceBounds={priceBounds}
            categories={categories}
          />
        </aside>

        <main className="shop-content">
          <div className="shop-toolbar">
            <h2>
              {filters.category === "All" ? "All Products" : filters.category}
            </h2>

            <span>
              Showing {filteredProducts.length} of {products.length}
            </span>
          </div>

          <div className="shop-grid">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="shop-card"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <div className="shop-image">
                  <img src={p.image_url} alt={p.title} />
                </div>

                <h3>{p.title}</h3>

                <div className="price">
                  {p.sale_price ? (
                    <>
                      <span className="old-price">${p.price}</span>
                      <span className="new-price">${p.sale_price}</span>
                    </>
                  ) : (
                    <span className="new-price">${p.price}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </section>
  );
}
