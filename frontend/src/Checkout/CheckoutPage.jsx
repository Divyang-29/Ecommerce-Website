import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [cart, setCart] = useState(null);
  const [items, setItems] = useState([]);
  const [payment, setPayment] = useState("cod");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    country: "United States",
    address: "",
    city: "",
    postal_code: "",
  });

  /* ================= FETCH CART ================= */
  useEffect(() => {
    if (!token) navigate("/");

    fetch("http://localhost:8080/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.cart);
        setItems(data.items || []);
      });
  }, []);

  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:8080/api/orders/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cart_id: cart.id,
            total,
            payment_method: payment,
            address,
          }),
        }
      );

      const data = await res.json();

      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* ================= LEFT (FORM) ================= */}
        <form
          id="checkoutForm"
          className={`checkout-left needs-validation ${
            validated ? "was-validated" : ""
          }`}
          noValidate
          onSubmit={handleSubmit}
        >
          <h2>Contact Information</h2>

          <input
            required
            placeholder="Phone number or email address"
            value={address.phone}
            onChange={(e) =>
              setAddress({ ...address, phone: e.target.value })
            }
          />
          <div className="invalid-feedback">
            Phone or email is required
          </div>

          <h2>Shipping Address</h2>

          <select
            required
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
          >
            <option value="">Select Country</option>
            <option>United States</option>
            <option>India</option>
          </select>
          <div className="invalid-feedback">
            Country is required
          </div>

          <div className="row">
            <input
              required
              placeholder="First name"
              onChange={(e) =>
                setAddress({ ...address, first_name: e.target.value })
              }
            />
            <input
              required
              placeholder="Last name"
              onChange={(e) =>
                setAddress({ ...address, last_name: e.target.value })
              }
            />
          </div>

          <input
            required
            placeholder="Street address"
            onChange={(e) =>
              setAddress({ ...address, address: e.target.value })
            }
          />
          <div className="invalid-feedback">
            Address is required
          </div>

          <div className="row">
            <input
              required
              placeholder="City"
              onChange={(e) =>
                setAddress({ ...address, city: e.target.value })
              }
            />
            <input
              required
              placeholder="Postal Code"
              onChange={(e) =>
                setAddress({
                  ...address,
                  postal_code: e.target.value,
                })
              }
            />
          </div>

          <span
            className="return"
            onClick={() => navigate("/cart")}
          >
            ← Return To Cart
          </span>
        </form>

        {/* ================= RIGHT ================= */}
        <div className="checkout-right">
          <h3>Cart Totals</h3>

          <div className="summary-row">
            <span>Total</span>
            <span>{items.length} Items</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>$0.00</span>
          </div>

          <div className="summary-row total">
            <span>Payable Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <h3>Payment Method</h3>

          <label>
            <input
              type="radio"
              checked={payment === "cod"}
              onChange={() => setPayment("cod")}
            />
            Cash on delivery
          </label>

          <label>
            <input
              type="radio"
              checked={payment === "card"}
              onChange={() => setPayment("card")}
            />
            Card payment
          </label>

          {/* 🔥 SUBMIT BUTTON (CONNECTED TO FORM) */}
          <button
            type="submit"
            form="checkoutForm"
            className="place-order"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
