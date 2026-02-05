import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

import HomeLayout from "./HomeScreen/HomeLayout";
import ShopPage from "./Shop/ShopPage";
import ProductPage from "./Product/ProductPage";
import CartPage from "./CartPage/CartPage";
import Register from "./Auth/Register";
import CheckoutPage from "./Checkout/CheckoutPage";
import TrackOrderPage from "./TrackOrderPage/TrackOrderPage";
import WishlistPage from "./WishlistPage/WishlistPage";
import Contact from "./Contact/Contact";
import ScrollToTop from "./ScrollToTop";
import AboutUs from "./AboutUs/AboutUs";
import FaqPage from "./FaqPage/FaqPage";
import TermsPage from "./TermsPage/TermsPage";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import SearchDrawer from "./SearchDrawer/SearchDrawer";
import BlogSection from "./BlogSection/BlogSection";

import AdminRoute from "./AdminRoute";
import AdminLayout from "./Admin/AdminLayout";
import Products from "./Admin/pages/Products";
import Categories from "./Admin/pages/Categories";
import Blogs from "./Admin/pages/Blogs";
import FAQs from "./Admin/pages/FAQs";
import Orders from "./Admin/pages/Orders";
import About from "./Admin/pages/About";
import Privacy from "./Admin/pages/Privacy";
import Terms from "./Admin/pages/Terms";
import Testimonials from "./Admin/pages/Testimonials";
import Trending from "./Admin/pages/Trending";
import AdminShipment from "./Admin/pages/AdminShipment";

function App() {
  const location = useLocation();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAdminUser = user?.role === "admin";

  const hideLayout = isAdminRoute && isAdminUser;

  return (
    <>
      {!hideLayout && <Navbar />}
      {!hideLayout && <ScrollToTop />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomeLayout />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:categorySlug" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/track" element={<TrackOrderPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/search" element={<SearchDrawer />} />
        <Route path="/blogs" element={<BlogSection />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Products />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="faqs" element={<FAQs />} />
          <Route path="orders" element={<Orders />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="trending" element={<Trending />} />
          <Route path="shipment" element={<AdminShipment/>}/>
        </Route>
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
