const express = require("express");

const router = express.Router();

const {
  register,
  login,
  logout,
  refresh
} = require("../controllers/authController");

const authenticateToken = require("../middleware/authMiddleware");

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

// Refresh access token
router.post("/refresh", refresh);

// Test route
router.get("/test", (req, res) => {
  res.json({
    message: "Auth routes are working"
  });
});

module.exports = router;