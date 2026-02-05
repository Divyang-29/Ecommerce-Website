import "./Filters.css";

export default function Filters({
  filters,
  setFilters,
  priceBounds,
  categories,
  sizes = ["S", "M", "L", "XL"],
}) {
  return (
    <div className="shop-filters">
      <h3>Categories</h3>

      <label>
        <input
          type="radio"
          checked={filters.category === "All"}
          onChange={() => setFilters({ ...filters, category: "All" })}
        />
        All Products
      </label>

      {categories.map(([cat, count]) => (
        <label key={cat}>
          <input
            type="radio"
            checked={filters.category === cat}
            onChange={() => setFilters({ ...filters, category: cat })}
          />
          {cat} ({count})
        </label>
      ))}

      <h3>Availability</h3>
      <label>
        <input
          type="radio"
          checked={filters.inStock === true}
          onChange={() => setFilters({ ...filters, inStock: true })}
        />
        In Stock
      </label>

      <label>
        <input
          type="radio"
          checked={filters.inStock === false}
          onChange={() => setFilters({ ...filters, inStock: false })}
        />
        Out of Stock
      </label>

      <label>
        <input
          type="radio"
          checked={filters.inStock === null}
          onChange={() => setFilters({ ...filters, inStock: null })}
        />
        All
      </label>

      <h3>Price</h3>
      <input
        type="range"
        min={priceBounds[0]}
        max={priceBounds[1]}
        value={filters.price[1]}
        onChange={(e) =>
          setFilters({
            ...filters,
            price: [priceBounds[0], Number(e.target.value)],
          })
        }
      />
      <p>
        ${filters.price[0]} – ${filters.price[1]}
      </p>

      <h3>Size</h3>
      {sizes.map((s) => (
        <label key={s}>
          <input
            type="radio"
            checked={filters.size === s}
            onChange={() => setFilters({ ...filters, size: s })}
          />
          {s}
        </label>
      ))}

      <label>
        <input
          type="radio"
          checked={filters.size === null}
          onChange={() => setFilters({ ...filters, size: null })}
        />
        All Sizes
      </label>
    </div>
  );
}
