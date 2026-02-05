import "./ShopSkeleton.css";

export default function ShopSkeleton({ count = 8 }) {
  return (
    <div className="shop-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="shop-card skeleton" key={i}>
          <div className="skeleton-img" />
          <div className="skeleton-line title" />
          <div className="skeleton-line price" />
        </div>
      ))}
    </div>
  );
}
