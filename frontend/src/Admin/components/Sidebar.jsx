import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <h2>Torado Admin</h2>

      <NavLink to="/admin">Dashboard</NavLink>
      <NavLink to="/admin/products">Products</NavLink>
      <NavLink to="/admin/categories">Categories</NavLink>
      <NavLink to="/admin/blogs">Blogs</NavLink>
      <NavLink to="/admin/faqs">FAQs</NavLink>
      <NavLink to="/admin/orders">Orders</NavLink>
      <NavLink to="/admin/about">About Page</NavLink>
      <NavLink to="/admin/privacy">Privacy Policy</NavLink>
      <NavLink to="/admin/terms">Terms</NavLink>
      <NavLink to="/admin/testimonials">Testimonials</NavLink>
      <NavLink to="/admin/trending">Trending</NavLink>
      <NavLink to="/admin/shipment">Shipment</NavLink>
      <NavLink to="/" style={{color:"red"}}>Logout</NavLink>
    </aside>
  );
}
