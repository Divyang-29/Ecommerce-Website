import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../Auth/LoginModal";
import SearchDrawer from "../SearchDrawer/SearchDrawer";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showPages, setShowPages] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  /* ---------- CHECK AUTH ---------- */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetchCartCount();
    fetchWishlistCount();
  }, []);

  /* ---------- LOGOUT ---------- */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowMenu(false);
    setCartCount(0);
    setWishlistCount(0);
    navigate("/");
  };

  const handleMenuNavigate = (path) => {
    setShowMenu(false);
    navigate(path);
  };

  /* ---------- CART COUNT ---------- */
  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      const count = (data.items || []).reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  };

  /* ---------- WISHLIST COUNT ---------- */
  const fetchWishlistCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setWishlistCount(0);
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setWishlistCount(data.length || 0);
    } catch {
      setWishlistCount(0);
    }
  };

  return (
    <>
      {/* TOP BAR */}
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-bar-left">
          <span>
            <i className="fa-solid fa-phone"></i> +78 5875 4589
          </span>
          <span>
            <i className="fa-regular fa-envelope"></i> support@torado.com
          </span>
        </div>

        <div className="top-bar-center">
          Summer sale discount off <strong>50%</strong>! Shop Now
        </div>

        <div className="top-bar-right">
          <span>
            <i className="fa-solid fa-location-dot"></i> Location
          </span>
          <span>
            English <i className="fa-solid fa-chevron-down"></i>
          </span>
          <span>
            USD <i className="fa-solid fa-chevron-down"></i>
          </span>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-icon">◐</span>
          <span className="logo-text">Torado</span>
        </div>

        <ul className="menu">
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/shop")}>Shop</li>
          <li onClick={() => navigate("/shop/accessories")}>Accessories</li>
          <li onClick={() => navigate("/shop/footware")}>Footwear</li>

          <li
            className="pages-dropdown"
            onMouseEnter={() => setShowPages(true)}
            onMouseLeave={() => setShowPages(false)}
          >
            <span className="pages-label">Pages</span>

            <div className={`pages-menu ${showPages ? "open" : ""}`}>
              <span onClick={() => navigate("/about")}>About Us</span>
              <span onClick={() => navigate("/contact")}>Contact Us</span>
              <span onClick={() => navigate("/faq")}>FAQ</span>
              <span onClick={() => navigate("/account")}>My Account</span>
              <span onClick={() => navigate("/terms")}>Terms & Condition</span>
              <span onClick={() => navigate("/privacy")}>Privacy Policy</span>
            </div>
          </li>

          <li onClick={() => navigate("/blogs")}>Blog</li>
        </ul>

        {/* ICONS */}
        <div className="icons">
          {/* 🔍 SEARCH */}
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => setShowSearch(true)}
          ></i>

          {/* 👤 USER */}
          <div className="user-menu-wrapper">
            <i
              className="fa-regular fa-user"
              onClick={() =>
                user ? setShowMenu(!showMenu) : setShowLogin(true)
              }
            />

            {user && showMenu && (
              <div className="user-dropdown">
                <p className="user-name">Hi, {user.first_name}</p>

                {user.role === "admin" ? (
                  <span onClick={() => handleMenuNavigate("/admin")}>
                    Dashboard
                  </span>
                ) : (
                  <span onClick={() => handleMenuNavigate("/profile")}>
                    Profile
                  </span>
                )}

                <span onClick={() => handleMenuNavigate("/track")}>
                  Track Order
                </span>

                <span className="logout" onClick={logout}>
                  Logout
                </span>
              </div>
            )}
          </div>

          {/* ❤️ WISHLIST */}
          <div className="icon-badge" onClick={() => navigate("/wishlist")}>
            <i className="fa-regular fa-heart"></i>
            {wishlistCount > 0 && (
              <span className="badge">{wishlistCount}</span>
            )}
          </div>

          {/* 🛒 CART */}
          <div className="icon-badge" onClick={() => navigate("/cart")}>
            <i className="fa-solid fa-cart-shopping"></i>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </div>
        </div>
      </nav>

      {/* 🔍 SEARCH DRAWER */}
      {showSearch && <SearchDrawer onClose={() => setShowSearch(false)} />}

      {/* 🔐 LOGIN MODAL */}
      {showLogin && (
        <LoginModal
          onClose={() => {
            setShowLogin(false);
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
              setUser(JSON.parse(storedUser));
              fetchCartCount();
              fetchWishlistCount();
            }
          }}
        />
      )}
    </>
  );
}
