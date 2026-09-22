const authService = require("../services/authService");

const sendAuthError = (res, error, fallbackMessage) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: error.message || fallbackMessage,
  });
};

// REGISTER
const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      message: "Registration successful",
      user,
    });
  } catch (error) {
    sendAuthError(res, error, "Registration failed");
  }
};


// LOGIN
const login = async (req, res) => {
  try {
    const { accessToken, refreshToken } = await authService.login(req.body);

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
    sendAuthError(res, error, "Login failed");
  }
};


// LOGOUT
const logout = async (req, res) => {
  try {
    await authService.logout(req.cookies.refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Logout successful",
    });

  } catch (error) {
    sendAuthError(res, error, "Logout failed");
  }
};


// REFRESH ACCESS TOKEN
const refresh = async (req, res) => {
  try {
    const accessToken = await authService.refresh(req.cookies.refreshToken);

    res.status(200).json({
      message: "Access token refreshed",
      accessToken,
    });
  } catch (error) {
    sendAuthError(res, error, "Invalid or expired refresh token");
  }
};


module.exports = {
  register,
  login,
  logout,
  refresh,
};