const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/* ================= REGISTER ================= */
exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role, adminSecret } =
      req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const emailLower = email.trim().toLowerCase();
    const existingUser = await User.findByEmail(emailLower);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    /* ===== ADMIN PROTECTION ===== */
    let userRole = "user";

    if (role === "admin") {
      if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({
          message: "Invalid admin secret key",
        });
      }
      userRole = "admin";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.createUser({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({
      message: "Registration failed",
    });
  }
};

/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const emailLower = email.trim().toLowerCase();

    const user = await User.findByEmail(emailLower);
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Login failed",
    });
  }
};
