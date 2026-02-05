import { useNavigate } from "react-router-dom";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import Logo from "./../assets/shopnest.png";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      {/* NEWSLETTER */}
      <div className="newsletter">
        <div className="container newsletter-inner">
          <div className="newsletter-text">
            <h3>Subscribe to Our Newsletter</h3>
            <p>Stay up to date with new collections and exclusive offers.</p>
          </div>

          <form className="newsletter-form">
            <input type="email" placeholder="Enter email address" required />
            <button type="submit">Subscribe Now</button>
          </form>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="footer-main">
        <div className="container footer-grid">
          {/* ABOUT */}
          <div className="footer-col">
            <div className="logo" onClick={() => navigate("/")}>
              <img src={Logo} alt="ShopNest Logo" className="logo-img" />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur. Risus lacus neque velit
              augue integer vel id nunc blandit.
            </p>

            <div className="socials">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/about")}>About Us</li>
              <li>Delivery</li>
              <li onClick={() => navigate("/contact")}>Contact Us</li>
            </ul>
          </div>

          {/* INFORMATION */}
          <div className="footer-col">
            <h4>Information</h4>
            <ul>
              <li>Refund Policy</li>
              <li>Shipping FAQ</li>
              <li>My Account</li>
              <li onClick={() => navigate("/terms")}>Terms & Conditions</li>
            </ul>
          </div>

          {/* USEFUL LINKS */}
          <div className="footer-col">
            <h4>Useful Links</h4>
            <ul>
              <li>My Account</li>
              <li onClick={() => navigate("/wishlist")}>My Wishlists</li>
              <li onClick={() => navigate("/checkout")}>Checkout</li>
              <li onClick={() => navigate("/blogs")}>Latest News</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul className="contact-list">
              <li>
                <FaMapMarkerAlt />
                2750 Quadra Street Victoria, Canada
              </li>
              <li>
                <FaPhoneAlt />
                (+123) 456-7898
              </li>
              <li>
                <FaEnvelope />
                support@torado.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <div className="container bottom-inner">
          <p>
            © Copyright <b>Torado</b> All Rights Reserved by <b>EnvyTheme</b>
          </p>

          <div className="payments">
            <img src="https://i.imgur.com/Q3jR7Qe.png" alt="visa" />
            <img src="https://i.imgur.com/8k5Yb6P.png" alt="mastercard" />
            <img src="https://i.imgur.com/2ISgYja.png" alt="paypal" />
            <img src="https://i.imgur.com/w1uZKkT.png" alt="discover" />
          </div>
        </div>
      </div>
    </footer>
  );
}
