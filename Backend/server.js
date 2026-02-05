const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
require("./config/db");

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const productAdditionalInfoRoutes = require("./routes/productAdditionalInfoRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const contactRoutes = require("./routes/contactRoutes");
const faqCategoryRoute = require("./routes/faqCategoryRoutes");
const faqRoutes = require("./routes/faqRoutes");
const termRoutes = require("./routes/termsRoutes");
const privacyRoutes = require("./routes/privacyRoutes");
const blogRoutes = require("./routes/blogRoutes");
const cartRoutes = require("./routes/cartRoutes");
const cartItemRoutes = require("./routes/cartItemRoutes");
const orderRoutes = require("./routes/orderRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");
const shipmentAdminRoutes = require("./routes/shipmentAdminRoutes");
const trendingRoutes = require("./routes/trendingRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/trending", trendingRoutes);
app.use("/api/products", productRoutes);
app.use("/api/product-additional-info", productAdditionalInfoRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/faq-categories", faqCategoryRoute);
app.use("/api/faqs", faqRoutes);
app.use("/api/terms", termRoutes);
app.use("/api/privacy", privacyRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/cart", cartItemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shipment", shipmentRoutes);
app.use("/api/admin/shipment", shipmentAdminRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/wishlist", wishlistRoutes);


app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
