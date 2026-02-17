const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { authMiddleware, roleMiddleware } = require("./middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Backend Server Running with MongoDB 🚀");
});

// Protected route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});


// Admin-only route
app.get("/api/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.json({ message: "Welcome Admin", user: req.user });
});

// Faculty-only route
app.get("/api/faculty", authMiddleware, roleMiddleware("faculty"), (req, res) => {
  res.json({ message: "Welcome Faculty", user: req.user });
});

// Student-only route
app.get("/api/student", authMiddleware, roleMiddleware("student"), (req, res) => {
  res.json({ message: "Welcome Student", user: req.user });
});

// Multi-role route (example: accessible by admin & faculty)
app.get("/api/admin-faculty", authMiddleware, roleMiddleware("admin", "faculty"), (req, res) => {
  res.json({ message: "Accessible by Admin & Faculty", user: req.user });
});


// Register new user
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
