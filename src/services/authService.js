const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const register = async ({ username, email, password } = {}) => {
  if (!username || !email || !password) {
    throw createError("Username, email, and password are required", 400);
  }

  if (await userModel.findUserByEmail(email)) {
    throw createError("Email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return userModel.createUser(username, email, hashedPassword);
};

const login = async ({ email, password } = {}) => {
  if (!email || !password) {
    throw createError("Email and password are required", 400);
  }

  const user = await userModel.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createError("Invalid email or password", 401);
  }

  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  await userModel.saveRefreshToken(
    user.id,
    refreshToken,
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  return { accessToken, refreshToken };
};

const logout = async (refreshToken) => {
  if (refreshToken) {
    await userModel.deleteRefreshToken(refreshToken);
  }
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw createError("Refresh token required", 401);
  }

  if (!(await userModel.findRefreshToken(refreshToken))) {
    throw createError("Invalid refresh token", 403);
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    return jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );
  } catch (error) {
    throw createError("Invalid or expired refresh token", 403);
  }
};

module.exports = { register, login, logout, refresh };