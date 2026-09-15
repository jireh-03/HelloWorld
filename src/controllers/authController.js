const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// REGISTER
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email, and password are required",
      });
    }

    const existingUser = await userModel.findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.createUser(
      username,
      email,
      hashedPassword
    );

    res.status(201).json({
      message: "Registration successful",
      user,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Registration failed",
    });
  }
};


// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await userModel.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Create access token
    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      }
    );

    // Create refresh token
    const refreshToken = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Refresh token expiration date
    const expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    // Save refresh token to database
    await userModel.saveRefreshToken(
      user.id,
      refreshToken,
      expiresAt
    );

    // Store refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login failed",
    });
  }
};


// LOGOUT
const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // Delete refresh token from database
    if (refreshToken) {
      await userModel.deleteRefreshToken(refreshToken);
    }

    // Clear refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Logout successful",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Logout failed",
    });
  }
};


// REFRESH ACCESS TOKEN
const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // Check if refresh token exists
    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token required",
      });
    }

    // Check if token exists in database
    const storedToken = await userModel.findRefreshToken(refreshToken);

    if (!storedToken) {
      return res.status(403).json({
        message: "Invalid refresh token",
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    // Create new access token
    const accessToken = jwt.sign(
      {
        userId: decoded.userId,
      },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.status(200).json({
      message: "Access token refreshed",
      accessToken,
    });

  } catch (error) {
    console.error(error);

    res.status(403).json({
      message: "Invalid or expired refresh token",
    });
  }
};


module.exports = {
  register,
  login,
  logout,
  refresh,
};