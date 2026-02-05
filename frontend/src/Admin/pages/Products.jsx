import { useState } from "react";
import Header from "../components/Header";
import "./Products.css";

export default function Products() {
  const token = localStorage.getItem("token");
  const [productId, setProductId] = useState(null);

  /* ================= PRODUCT FORM ================= */
  const [productForm, setProductForm] = useState({
    category_id: "",
    title: "",
    description: "",
    price: "",
    sale_price: "",
  });

  /* ================= IMAGE FORM ================= */
  const [imageForm, setImageForm] = useState({
    image_url: "",
    is_primary: false,
  });

  /* ================= SIZE FORM ================= */
  const [sizeForm, setSizeForm] = useState({
    size: "",
    stock: "",
  });

  /* ================= COLOR FORM ================= */
  const [colorForm, setColorForm] = useState({
    color_name: "",
  });

  /* ================= HANDLERS ================= */
  const handleProductChange = (e) =>
    setProductForm({ ...productForm, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const { name, value, type, checked } = e.target;
    setImageForm({
      ...imageForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSizeChange = (e) =>
    setSizeForm({ ...sizeForm, [e.target.name]: e.target.value });

  const handleColorChange = (e) =>
    setColorForm({ ...colorForm, [e.target.name]: e.target.value });

  /* ================= API CALLS ================= */

  // STEP 1: CREATE PRODUCT
  const createProduct = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productForm),
    });

    const product = await res.json();
    setProductId(product.id);
  };

  // STEP 2: ADD IMAGE
  const addImage = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8080/api/products/${productId}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(imageForm),
    });

    setImageForm({ image_url: "", is_primary: false });
  };

  // STEP 3: ADD SIZE
  const addSize = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8080/api/products/${productId}/sizes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sizeForm),
    });

    setSizeForm({ size: "", stock: "" });
  };

  // STEP 4: ADD COLOR
  const addColor = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8080/api/products/${productId}/colors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(colorForm),
    });

    setColorForm({ color_name: "" });
  };

  return (
    <>
      <Header title="Admin Products" subtitle="Create & manage products" />

      {/* ================= CREATE PRODUCT FORM ================= */}
      {!productId && (
        <form className="admin-form" onSubmit={createProduct}>
          <h3>Create Product</h3>

          <input
            name="category_id"
            placeholder="Category ID"
            onChange={handleProductChange}
            required
          />
          <input
            name="title"
            placeholder="Title"
            onChange={handleProductChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleProductChange}
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleProductChange}
            required
          />
          <input
            name="sale_price"
            type="number"
            placeholder="Sale Price"
            onChange={handleProductChange}
          />

          <button type="submit">Create Product</button>
        </form>
      )}

      {/* ================= AFTER PRODUCT CREATED ================= */}
      {productId && (
        <>
          {/* -------- IMAGE FORM -------- */}
          <form className="admin-form" onSubmit={addImage}>
            <h3>Add Image</h3>

            <input
              name="image_url"
              placeholder="Image URL"
              value={imageForm.image_url}
              onChange={handleImageChange}
              required
            />

            <label>
              <input
                type="checkbox"
                name="is_primary"
                checked={imageForm.is_primary}
                onChange={handleImageChange}
              />
              Primary Image
            </label>

            <button type="submit">Add Image</button>
          </form>

          {/* -------- SIZE FORM -------- */}
          <form className="admin-form" onSubmit={addSize}>
            <h3>Add Size</h3>

            <input
              name="size"
              placeholder="Size (UK 9)"
              value={sizeForm.size}
              onChange={handleSizeChange}
              required
            />

            <input
              name="stock"
              type="number"
              placeholder="Stock"
              value={sizeForm.stock}
              onChange={handleSizeChange}
              required
            />

            <button type="submit">Add Size</button>
          </form>

          {/* -------- COLOR FORM -------- */}
          <form className="admin-form" onSubmit={addColor}>
            <h3>Add Color</h3>

            <input
              name="color_name"
              placeholder="Color"
              value={colorForm.color_name}
              onChange={handleColorChange}
              required
            />

            <button type="submit">Add Color</button>
          </form>
        </>
      )}
    </>
  );
}
