import "./FeaturedCategories.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const categories = [
  { id: 1, name: "Pant", slug: "pant", count: 75, image: "https://torado.envytheme.com/men-fashion-wear/default/assets/images/categories/categories1.png" },
  { id: 2, name: "Polo Shirt", slug: "polo-t-shirt", count: 89, image: "https://torado.envytheme.com/men-fashion-wear/default/assets/images/categories/categories2.png" },
  { id: 3, name: "Blazer", slug: "blazer", count: 47, image: "https://torado.envytheme.com/men-fashion-wear/default/assets/images/categories/categories3.png" },
  { id: 4, name: "Jacket", slug: "jacket", count: 38, image: "https://torado.envytheme.com/men-fashion-wear/default/assets/images/categories/categories4.png" },
  { id: 5, name: "T-Shirt", slug: "t-shirt", count: 43, image: "https://torado.envytheme.com/men-fashion-wear/default/assets/images/categories/categories5.png" },
  { id: 6, name: "Accessories", slug: "accessories", count: 23, image: "https://images.unsplash.com/photo-1586878341523-7acb55eb8c12?w=900&auto=format&fit=crop&q=60" },
  { id: 7, name: "Footwear", slug: "footwear", count: 67, image: "https://images.unsplash.com/photo-1668069226492-508742b03147?q=80&w=2070&auto=format&fit=crop" }
];

// 🔁 CLONE ITEMS
const loopedCategories = [
  categories[categories.length - 1],
  ...categories,
  categories[0]
];

export default function FeaturedCategories() {
  const navigate = useNavigate();
  const listRef = useRef(null);
  const cardWidth = 210; // card width + gap

  useEffect(() => {
    // start from first REAL item
    listRef.current.scrollLeft = cardWidth;
  }, []);

  const scrollRight = () => {
    listRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  const scrollLeft = () => {
    listRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
  };

  const handleScroll = () => {
    const el = listRef.current;
    const maxScroll =
      cardWidth * (loopedCategories.length - 1);

    // if at fake first → jump to real last
    if (el.scrollLeft <= 0) {
      el.scrollLeft = cardWidth * (categories.length);
    }

    // if at fake last → jump to real first
    if (el.scrollLeft >= maxScroll) {
      el.scrollLeft = cardWidth;
    }
  };

  return (
    <section className="featured">
      <div className="featured-container">
        <div className="featured-header">
          <h2>Featured Categories</h2>

          <div className="nav-buttons">
            <button onClick={scrollLeft}>
              <FaChevronLeft />
            </button>
            <button onClick={scrollRight}>
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div
          className="category-list"
          ref={listRef}
          onScroll={handleScroll}
        >
          {loopedCategories.map((cat, index) => (
            <div
              key={`${cat.id}-${index}`}
              className="category-card"
              onClick={() => navigate(`/shop/${cat.slug}`)}
            >
              <div className="image-wrapper">
                <img src={cat.image} alt={cat.name} />
              </div>
              <h3>{cat.name}</h3>
              <p>{cat.count} Products</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
