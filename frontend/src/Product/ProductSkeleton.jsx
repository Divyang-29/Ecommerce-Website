import "./ProductSkeleton.css";


export default function ProductSkeleton() {
  return (
    <section className="product-page">
      <div className="product-container skeleton">
        {/* LEFT */}
        <div className="product-left">
          <div className="thumb-skeleton" />
          <div className="image-skeleton" />
        </div>

        {/* RIGHT */}
        <div className="product-right">
          <div className="line long" />
          <div className="line medium" />

          <div className="line short" />
          <div className="line short" />

          <div className="qty-skeleton" />

          <div className="btn-skeleton" />
          <div className="btn-skeleton outline" />
        </div>
      </div>
    </section>
  );
}
