import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "super_secret_change_me";

// Register new user
export const register = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields (name, email, password) are required" });
  }

  if (password.length < 3) {
    return res.status(400).json({ success: false, message: "Password must be at least 3 characters" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role || "staff"],
    (err, result) => {
      if (err) {
        console.error("❌ Registration error:", err.message);
        return res.status(500).json({ 
          success: false, 
          message: "Registration failed. Email might already exist." 
        });
      }
      res.status(201).json({ 
        success: true, 
        message: "✅ User registered successfully! Please login." 
      });
    }
  );
};

// Login user
export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("❌ Login database error:", err.message);
      return res.status(500).json({ success: false, message: "Login failed" });
    }
    
    if (!results || results.length === 0) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ 
      success: true, 
      message: "✅ Login successful!", 
      token 
    });
  });
};