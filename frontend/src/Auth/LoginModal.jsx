import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./AuthModal.css";

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(email, password);

      // save auth
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ CLOSE MODAL
      onClose();

      // ✅ REDIRECT HOME
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-box">
        <button className="close" onClick={onClose}>
          ×
        </button>

        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary" onClick={handleLogin}>
          Log In
        </button>

        <p className="auth-footer">
          Don’t have an account?
          <span
            className="register-link"
            onClick={() => {
              onClose();
              navigate("/register");
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
