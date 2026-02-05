import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductPage.css";
import ProductSkeleton from "./ProductSkeleton";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);

  /* ===== REVIEWS ===== */
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  /* ---------- FETCH PRODUCT ---------- */
  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);

        const primary =
          data.images?.find((img) => img.is_primary)?.image_url ||
          data.images?.[0]?.image_url;

        setActiveImage(primary || data.image_url);

        if (data.sizes?.length) setSelectedSize(data.sizes[0].size);
        if (data.colors?.length) setSelectedColor(data.colors[0].color_name);
      })
      .catch(console.error);
  }, [id]);

  /* ---------- FETCH REVIEWS ---------- */
  useEffect(() => {
    fetch(`http://localhost:8080/api/reviews/${id}`)
      .then((res) => res.json())
      .then(setReviews)
      .catch(console.error);
  }, [id]);

  /* ---------- CHECK WISHLIST ---------- */
  useEffect(() => {
    if (!token || !product) return;

    fetch("http://localhost:8080/api/wishlist", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((items) => {
        setInWishlist(items.some((i) => i.product_id === product.id));
      })
      .catch(console.error);
  }, [product, token]);

  /* ---------- ADD TO CART ---------- */
  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color");
      return;
    }

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    await fetch("http://localhost:8080/api/cart/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: product.id,
        size: selectedSize,
        color: selectedColor,
        quantity,
        price: product.sale_price || product.price,
      }),
    });

    navigate("/cart");
  };

  /* ---------- TOGGLE WISHLIST ---------- */
  const toggleWishlist = async () => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (inWishlist) {
      await fetch(`http://localhost:8080/api/wishlist/${product.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setInWishlist(false);
    } else {
      await fetch("http://localhost:8080/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id, // ✅ MUST be productId
        }),
      });

      setInWishlist(true);
    }
  };

  /* ---------- ADD REVIEW ---------- */
  const submitReview = async () => {
    if (!token) {
      alert("Please login to add a review");
      navigate("/login");
      return;
    }

    if (!reviewText.trim()) return alert("Review text required");

    await fetch(`http://localhost:8080/api/reviews/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating, review_text: reviewText }),
    });

    setReviewText("");
    setRating(5);

    const res = await fetch(`http://localhost:8080/api/reviews/${id}`);
    setReviews(await res.json());
  };

  /* ---------- DELETE REVIEW ---------- */
  const deleteReview = async (reviewId) => {
    await fetch(`http://localhost:8080/api/reviews/${reviewId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  if (!product) {
    return <ProductSkeleton />;
  }

  return (
    <section className="product-page">
      <div className="product-container">
        {/* LEFT */}
        <div className="product-left">
          <div className="thumbnails">
            {product.images?.map((img) => (
              <img
                key={img.image_url}
                src={img.image_url}
                className={activeImage === img.image_url ? "active" : ""}
                onClick={() => setActiveImage(img.image_url)}
                alt=""
              />
            ))}
          </div>

          <div className="main-image-wrapper">
            <img src={activeImage} alt={product.title} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="product-right">
          <h1>{product.title}</h1>

          <div className="price">
            {product.sale_price && (
              <span className="old">${product.price}</span>
            )}
            <span className="new">${product.sale_price || product.price}</span>
          </div>

          <div className="sizes">
            <strong>Size:</strong>
            {product.sizes.map((s) => (
              <button
                key={s.size}
                className={selectedSize === s.size ? "active" : ""}
                onClick={() => setSelectedSize(s.size)}
              >
                {s.size}
              </button>
            ))}
          </div>

          <div className="colors">
            <strong>Color:</strong>
            {product.colors.map((c) => (
              <span
                key={c.color_name}
                className={`color-dot ${
                  selectedColor === c.color_name ? "active" : ""
                }`}
                style={{ backgroundColor: c.color_name.toLowerCase() }}
                onClick={() => setSelectedColor(c.color_name)}
              />
            ))}
          </div>

          <div className="quantity">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>

          <div className="actions">
            <button className="add-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <button
              className={`wishlist ${inWishlist ? "active" : ""}`}
              onClick={toggleWishlist}
            >
              {inWishlist ? "❤️ Wishlisted" : "🤍 Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="reviews-section">
        <h2>Customer Reviews</h2>

        <div className="add-review">
          <select value={rating} onChange={(e) => setRating(+e.target.value)}>
            <option value={5}>★★★★★</option>
            <option value={4}>★★★★☆</option>
            <option value={3}>★★★☆☆</option>
            <option value={2}>★★☆☆☆</option>
            <option value={1}>★☆☆☆☆</option>
          </select>

          <textarea
            placeholder="Write review…"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          <button onClick={submitReview}>Submit Review</button>
        </div>

        <div className="review-list">
          {reviews.map((r) => (
            <div key={r.id} className="review-card">
              <div className="review-header">
                <strong>{"★".repeat(r.rating)}</strong>
                {(user?.id === r.user_id || user?.role === "admin") && (
                  <button onClick={() => deleteReview(r.id)}>✕</button>
                )}
              </div>
              <p>{r.review_text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
